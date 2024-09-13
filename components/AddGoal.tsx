import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Constants from "expo-constants";
import { Milestone } from "@/classes/Milestone";
import { DatePickerModal } from "react-native-paper-dates";

interface AddGoalProps {
  visible: boolean;
  onDismiss: () => void;
  addGoal: (data: any) => void;
}

interface UseFormInputs {
  goal: string;
  milestones: Milestone[];
  reward: string;
  goalDate: Date;
}

const AddGoal: React.FC<AddGoalProps> = ({ visible, onDismiss, addGoal }) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UseFormInputs>({
    defaultValues: {
      goal: "",
      milestones: [{ milestone: "", completed: false }],
      reward: "",
      goalDate: new Date(),
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
    addGoal(data);
    onDismiss();
    reset();
  };

  const onChange = (arg: { nativeEvent: { text: any } }) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const { fields, append } = useFieldArray({
    control,
    name: "milestones",
  });

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );
  console.log("open", open);
  console.log("date", date);
  console.log("errors", errors);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}
      >
        {/* <View style={styles.container}> */}
        <Text style={styles.label}>Goal</Text>
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
          name="goal"
          rules={{ required: true }}
        />

        <Text style={styles.label}>Milestones</Text>
        {fields.map((field, index) => (
          <View key={field.id} style={styles.milestoneContainer}>
            <Controller
              control={control}
              name={`milestones.${index}.milestone`}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
        ))}
        <Button
          title="Add Milestone"
          onPress={() => append({ milestone: "", completed: false })}
        />

        <Text style={styles.label}>Reward</Text>
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
          name="reward"
          rules={{ required: false }}
        />

        <Text style={styles.label}>Select a date to achieve the goal</Text>
        <Button onPress={() => setOpen(true)} title="Select a Date"></Button>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePickerModal
              locale="en"
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={date}
              onConfirm={onConfirmSingle}
            />
          )}
          name="goalDate"
          rules={{ required: false }}
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        {/* </View> */}
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
});

export default AddGoal;
