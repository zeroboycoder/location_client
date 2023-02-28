<template>
  <v-container class="d-flex">
    <v-file-input
      label="Upload File"
      accept=".xlsx"
      class="mr-3"
      v-model="file"
      hide-details
    ></v-file-input>
    <v-btn variant="outlined" style="height: 56px" @click="checkValid">Check</v-btn>
    <v-btn variant="outlined" style="height: 56px">Upload</v-btn>
  </v-container>
  <v-container v-if="errors.length">
    <p v-for="error in errors" :key="error.name" style="color: red">* {{ error.name }}</p>
  </v-container>
  <v-container v-if="batchData.length">
    <v-table>
      <thead>
        <tr>
          <th class="text-left" v-for="title in tableHead" :key="title">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in batchData" :key="data">
          <td>{{ data.studentId }}</td>
          <td>{{ data.studentName }}</td>
          <td>{{ data.email }}</td>
          <td>{{ data.phone }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.gender }}</td>
          <td>{{ data.fbUrl }}</td>
          <td>{{ data.attendedClass }}</td>
          <td>{{ data.certifiedClass }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import { read, utils } from "xlsx";
export default {
  data: () => {
    return {
      file: [],
      batchData: [],
      errors: [],
      valid: false,
      tableHead: [
        "Student_ID",
        "Student_Name",
        "Email",
        "Phone",
        "Address",
        "Age",
        "Gender",
        "Facebook Account",
        "Attended_Class",
        "Certified_Class",
      ],
    };
  },
  methods: {
    checkValid() {
      let reader = new FileReader();
      reader.readAsArrayBuffer(this.file[0]);
      reader.onload = (event) => {
        const result = event.target.result;
        const BufferArray = new Uint8Array(result);
        const xlsxObj = read(BufferArray, { type: "array" });
        const sheetOne = xlsxObj.Sheets[xlsxObj.SheetNames[0]];
        const batchDataArray = utils.sheet_to_json(sheetOne, { header: 0 });
        this.batchData = batchDataArray;
        batchDataArray.forEach((data) => {
          if (this.checkNull(data).length === 0) {
            // true
            this.$eventBus.$emit("show-alert-success", {
              message: "File is valid",
            });
            this.errors = [];
            this.valid = true;
          } else {
            // false
            let i = 0;
            this.errors = this.checkNull(data);
            console.log(i);
            i++;
          }
        });
      };
    },
    checkNull(data) {
      const errorArray = [];
      if (data.studentName === undefined) {
        errorArray.push({ name: "Student Name is empty" });
      }
      if (data.studentId === undefined) {
        errorArray.push({ name: "Student Id is empty" });
      }
      if (data.email === undefined) {
        errorArray.push({ name: "Email is empty" });
      }
      if (data.phone === undefined) {
        errorArray.push({ name: "Phone is empty" });
      }
      if (data.address === undefined) {
        errorArray.push({ name: "Address is empty" });
      }
      if (data.age === undefined) {
        errorArray.push({ name: "Age is empty" });
      }
      if (data.gender === undefined) {
        errorArray.push({ name: "Gender is empty" });
      }
      if (data.fbUrl === undefined) {
        errorArray.push({ name: "fbUrl is empty" });
      }
      if (data.attendedClass === undefined) {
        errorArray.push({ name: "Attended Class is empty" });
      }
      console.log({ attended: data.attendedClass });
      console.log(errorArray);
      return errorArray;
    },
  },
};
</script>
