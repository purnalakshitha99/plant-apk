<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title>DASHBOARD</ion-title>
        <div class="ion-activatable ripple-parent circle">
          <ion-ripple-effect></ion-ripple-effect>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="main-container" fullscreen>
      <ion-searchbar
        v-model="filterKeyword"
        placeholder="Filter plants by name"
        show-cancel-button="always"
        @ionClear="clearFilter"
        @ionInput="onSearchInput"
      ></ion-searchbar>
      <ion-loading
        :is-open="is_loading"
        cssClass="my-custom-class"
        message="Please wait..."
      />

      <div class="">
        <ion-list>
          <ion-grid>
            <div
              class="small-header anim"
              style="--delay: 0.3s; margin-left: 5px"
            >
              <ion-text color="#000000">
                <h3>Plants</h3>
              </ion-text>
            </div>
            <ion-row v-for="data in filtered_data" :key="data._id">
              <ion-col size="12">
                <div
                  class="plant-card anim"
                  style="--delay: 0.1s"
                  @click="openSingleStaffModal(data)"
                >
                  <div class="image-container">
                    <img :src="data.url" alt="Plant 1" />
                  </div>
                  <div class="details">
                    <h2>{{ data.predicted_name }}</h2>
                  </div>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
      </div>
      <SingleStaff
        ref="singleStaff"
        @closeModel="closeModel()"
        @openUpdateStaffModal="openUpdateStaffModal"
      />
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, watch } from "vue";
import "@/assets/test.css";
import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonNavLink,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSelect,
  IonGrid,
  IonSelectOption,
  IonText,
  IonRippleEffect,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import prediction_api from "@/apis/modules/prediction_api";
import SingleStaff from "./modules/single_plant.vue";
export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonFooter,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonRefresher,
    IonRefresherContent,
    IonAvatar,
    IonRow,
    IonCol,
    IonNavLink,
    IonLoading,
    IonFab,
    IonFabButton,
    IonIcon,
    IonFabList,
    IonButton,
    IonSelect,
    IonGrid,
    IonSelectOption,
    IonText,
    IonRippleEffect,
    SingleStaff,
  },

  name: "index",

  data() {
    return {
      is_loading: false,
      all_data: [],
      filterKeyword: "",
      filtered_data: [],
    };
  },

  setup() {
    const router = useRouter();
    return {
      router,
    };
  },

  mounted() {
    this.getAllPredictedData();
  },

  methods: {
    openSingleStaffModal(data) {
      this.$refs.singleStaff.handleModel(data);
    },

    clearFilter(){
      console.log('clear')
      this.filtered_data = this.all_data
    },

    onSearchInput(event) {
      console.log();
      if (event.target.value) {
        this.filtered_data = this.all_data.filter((e) =>
          e.predicted_name.toLowerCase().includes(event.target.value)
        );
      }else{
        this.filtered_data = this.all_data
      }
    },

    navigateToSinglePlant(data) {
      this.$router.push({
        name: "single_plant",
        params: { id: data._id }, // Pass the ID as a parameter
        state: { data: data }, // Pass the data object as state
      });
    },
    getImagePath(imageFileName) {
      return require(`@/assets/${imageFileName}`);
    },

    async getAllPredictedData() {
      try {
        this.is_loading = true;
        let respond = (await prediction_api.predictedData()).data;
        this.all_data = respond;
        this.filtered_data = this.all_data;
        console.log(respond);
      } catch (e) {}
      this.is_loading = false;
    },
  },
};
</script>

<style scoped>
.plant-card {
  display: flex;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.image-container {
  flex: 1;
  margin-right: 10px;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.details {
  flex: 0.5;
  margin-top: auto; /* Push the text to the vertical center */
  margin-bottom: auto; 
}

h2 {
  font-size: 1.2rem;
  margin: 0;
}

p {
  margin: 5px 0;
}

.filter-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; /* Set margin to auto on both sides */
  max-width: 80%; /* Limit the maximum width of the filter container */
  margin-top: 10px; /* Adjust the top margin as needed */
}

/* Style the filter icon */
.filter-icon {
  color: #333; /* Adjust the color as needed */
  font-size: 24px; /* Adjust the font size as needed */
  margin-right: 10px; /* Add spacing between the icon and input */
}

/* Style the filter input */
.filter-input {
  width: 100%; /* Make the input fill the available space */
  border: 1px solid #ccc; /* Add a border or customize as needed */
  border-radius: 5px; /* Add rounded corners */
  padding: 8px; /* Add padding as needed */
  font-size: 16px; /* Adjust the font size as needed */
}
</style>
