import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Modal, Portal, RadioButton } from "react-native-paper";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import { Cadence, Duration } from "@/classes/Habit";
registerTranslation("en", enGB);

interface AddHabitProps {
  visible: boolean;
  onDismiss: () => void;
  addHabit: (data: any) => void;
}

interface UseFormInputs {
  habit: string;
  cadence: Cadence;
  selectedOption: string;
  isContinuous: boolean;
  duration?: Duration;
  frequency: number;
  endDate?: Date;
}

const calculateEndDate = (duration: Duration): Date => {
  const currentDate = new Date();
  let endDate = new Date(currentDate);

  switch (duration) {
    case Duration.M1:
      endDate.setMonth(currentDate.getMonth() + 1);
      break;
    case Duration.M3:
      endDate.setMonth(currentDate.getMonth() + 3);
      break;
    case Duration.M6:
      endDate.setMonth(currentDate.getMonth() + 6);
      break;
    case Duration.Y1:
      endDate.setFullYear(currentDate.getFullYear() + 1);
      break;
  }

  return endDate;
};

const AddHabit: React.FC<AddHabitProps> = ({
  visible,
  onDismiss,
  addHabit,
}) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [showSelectFrequency, setShowSelectFrequency] = React.useState(false);
  const [showSelectDuration, setShowSelectDuration] = React.useState(false);
  const [showSelectDate, setShowSelectDate] = React.useState(false);

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissDatePicker = React.useCallback(() => {
    setOpen(false);
    setDate(undefined);
  }, [setOpen]);

  const onConfirmDatePicker = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const handleDismiss = () => {
    setDate(undefined);
    setShowSelectFrequency(false);
    setShowSelectDuration(false);
    setShowSelectDate(false);
    reset();
    onDismiss();
  };

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UseFormInputs>({
    defaultValues: {
      habit: "",
      cadence: undefined,
      isContinuous: false,
      frequency: undefined,
      duration: undefined,
      endDate: new Date(),
      selectedOption: "option1",
    },
  });

  const onSubmit = (data: any) => {
    console.log("on submit");
    console.log(data);
    // data.goalDate = date;
    // data.milestones = processMilestones(data.milestones);
    console.log(data);
    addHabit(data);
    handleDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleDismiss}
        contentContainerStyle={containerStyle}
      >
        {/* <View style={styles.container}> */}
        <Text style={styles.label}>Habit title</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="habit"
          rules={{ required: true }}
        />
        {errors.habit && (
          <Text style={styles.validationErrorText}>This is required.</Text>
        )}

        <Text style={styles.label}>Habbit Cadence</Text>
        <Controller
          control={control}
          defaultValue={Cadence.Daily}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              style={styles.input}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                console.log(itemValue);
                if (itemValue != Cadence.Daily) {
                  setShowSelectFrequency(true);
                } else {
                  setShowSelectFrequency(false);
                }
              }}
            >
              <Picker.Item label="Daily" value={Cadence.Daily} />
              <Picker.Item label="Weekly" value={Cadence.Weekly} />
              <Picker.Item label="Monthly" value={Cadence.Monthly} />
            </Picker>
          )}
          name="cadence"
          rules={{ required: true }}
        />
        {errors.cadence && (
          <Text style={styles.validationErrorText}>This is required.</Text>
        )}

        {showSelectFrequency && (
          <View>
            <Text style={styles.label}>Habbit Frequency</Text>
            <Controller
              control={control}
              //rules= {{validate}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const numericValue = parseInt(text) || 0; // Ensure it's a number
                    onChange(numericValue);
                  }}
                  value={value ? String(value) : ""}
                />
              )}
              name="frequency"
              rules={{
                required: false,
                validate: (value) =>
                  value > 0 || "Frequency must be a positive number",
              }}
            />
            {errors.frequency && (
              <Text style={styles.validationErrorText}>This is required.</Text>
            )}
          </View>
        )}

        {/* Radio Button Group */}
        <Text style={styles.label}>Select how you want to track</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group
              onValueChange={(newValue) => {
                onChange(newValue);

                if (newValue === "isContinuous") {
                  setValue("isContinuous", true);
                  setValue("endDate", undefined);
                  setShowSelectDate(false);
                  setShowSelectDuration(false);
                } else if (newValue === "duration") {
                  setValue("isContinuous", false);
                  setShowSelectDuration(true);
                  setShowSelectDate(false);
                } else {
                  setValue("isContinuous", false);
                  setShowSelectDate(true);
                  setShowSelectDuration(false);
                }
              }}
              value={value} // Current selected value
            >
              <View style={styles.radioContainer}>
                <View style={styles.radioItem}>
                  <RadioButton value="isContinuous" />
                  <Text>Continuously</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton value="duration" />
                  <Text>For a duration</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton value="endDate" />
                  <Text>Till an end date</Text>
                </View>
              </View>
            </RadioButton.Group>
          )}
          name="selectedOption"
          rules={{ required: true }}
        />

        {showSelectDuration && (
          <View>
            <Text style={styles.label}>Habbit Duration</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  style={styles.input}
                  onValueChange={(itemValue) => {
                    onChange(itemValue);
                    const newEndDate = calculateEndDate(itemValue);
                    setValue("endDate", newEndDate); // Use setValue to store the calculated
                  }}
                >
                  <Picker.Item label="Options" />
                  <Picker.Item label="1 Month" value={Duration.M1} />
                  <Picker.Item label="3 Months" value={Duration.M3} />
                  <Picker.Item label="6 Months" value={Duration.M6} />
                  <Picker.Item label="1 Year" value={Duration.Y1} />
                </Picker>
              )}
              name="duration"
              rules={{ required: false }}
            />
          </View>
        )}

        {showSelectDate && (
          <View>
            <Button
              onPress={() => {
                setOpen(true);
              }}
              title={"end date"}
            ></Button>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissDatePicker}
                  date={date}
                  onConfirm={onConfirmDatePicker}
                />
              )}
              name="endDate"
              rules={{ required: false }}
            />
          </View>
        )}

        <View style={styles.marginTop}></View>
        {/*cant add style to button so need to add spacing this way */}
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "purple",
    height: 40,
    backgroundColor: "orange",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "pink",
  },
  input: {
    backgroundColor: "pink",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  milestoneContainer: {
    marginBottom: 12,
  },
  datePicker: {
    width: "100%",
    marginBottom: 12,
  },
  dateText: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
    textAlign: "center",
  },
  marginTop: {
    marginTop: 12,
  },
  validationErrorText: {
    color: "red",
  },
  radioContainer: {
    flexDirection: "row", // Align the radio buttons horizontally
    justifyContent: "space-between",
    marginBottom: 20,
  },
  radioItem: {
    flexDirection: "column",
    alignItems: "center", // Align text with the radio button
  },
});

export default AddHabit;
