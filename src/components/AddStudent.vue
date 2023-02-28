<template>
  <div class="text-h4 mt-3 text-center font-weight-bold">Add Student</div>
  <v-row class="justify-center mt-3" style="width: 100%" v-if="courses">
    <v-col cols="8">
      <v-text-field label="Student Name" variant="outlined" v-model="name"></v-text-field>
      <v-text-field
        label="Student ID"
        variant="outlined"
        v-model="studentId"
      ></v-text-field>
      <v-text-field label="Email" variant="outlined" v-model="email"></v-text-field>
      <v-text-field label="Phone" variant="outlined" v-model="phone"></v-text-field>
      <v-text-field label="Address" variant="outlined" v-model="address"></v-text-field>
      <v-text-field label="Age" variant="outlined" v-model="age"></v-text-field>
      <v-select
        label="Course"
        variant="outlined"
        :items="courses"
        item-title="name"
        v-model="course"
        return-object
      />
      <v-select
        label="Gender"
        :items="['Male', 'Female', 'Undefined']"
        variant="outlined"
        v-model="gender"
      ></v-select>
      <v-text-field
        label="Facebook Link"
        variant="outlined"
        v-model="facebookLink"
      ></v-text-field>
      <div class="d-flex justify-end">
        <div>
          <v-btn variant="text" class="mr-2" color="error">Cancle</v-btn>
          <v-btn @click="addStudent">Add Student</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import gql from "graphql-tag";
export default {
  data: () => {
    return {
      name: null,
      studentId: null,
      email: null,
      phone: null,
      address: null,
      age: null,
      course: null,
      gender: null,
      facebookLink: null,
    };
  },
  methods: {
    addStudent() {
      const studentData = {
        name: this.name,
        studentId: this.studentId,
        email: this.email,
        phone: this.phone,
        address: this.address,
        age: this.age,
        gender: this.gender,
        facebookLink: this.facebookLink,
      };
      console.log(studentData);
      this.$apollo
        .mutate({
          mutation: gql`
            mutation AddStudent($student: StudentDTO!) {
              addStudent(student: $student)
            }
          `,
          variables: {
            student: studentData,
          },
        })
        .then(() => {
          this.$eventBus.$emit("show-alert-success", { text: "Successfully Added." });
          this.name = null;
          this.studentId = null;
          this.email = null;
          this.phone = null;
          this.address = null;
          this.age = null;
          this.gender = null;
          this.facebookLink = null;
        })
        .catch((err) => console.log(err));
    },
  },
  apollo: {
    courses: {
      query: gql`
        query Courses {
          courses {
            _id
            title
            batch
          }
        }
      `,
    },
  },
};
</script>
