<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar
        style="padding-bottom: 20px; background-color: black"
        slot="bottom"
      >
        <ion-tab-button tab="plants"
                        v-on:click="afterTabChange('plants')" style="background-color: black">

          <ion-icon :icon="homeOutline" />
          <ion-label v-show="tabName === 'plants'" style="color: #5bf5a8;">Dashboard</ion-label>
          <ion-label v-show="tabName !== 'plants'" style="color: #ffffff;">Dashboard</ion-label>

        </ion-tab-button>

        <ion-tab-button tab="scan_plant"
                        v-on:click="afterTabChange('scan_plant')" style="background-color: black">
          <ion-icon :icon="mapOutline" />
          <ion-label v-show="tabName === 'plants'" style="color: #5bf5a8;">Scan</ion-label>
          <ion-label v-show="tabName !== 'plants'" style="color: #ffffff;">Scan</ion-label>

        </ion-tab-button>


        <ion-tab-button
          @click="confirmRequest()"
          tab="profile"
          v-on:click="afterTabChange('profile')"
          style="background-color: black"
        >
          <ion-icon :icon="logOutOutline" />
          <ion-label v-show="tabName === 'logout'" style="color: #5bf5a8"
            >Logout</ion-label
          >
          <ion-label v-show="tabName !== 'logout'" style="color: #ffffff"
            >Logout</ion-label
          >
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  alertController
} from "@ionic/vue";
import {
  cafeOutline,
  calendarOutline,
  homeOutline,
  timeOutline,
  peopleOutline,
  mapOutline,
  personCircleOutline,
  logOutOutline
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  methods: {
    async beforeTabChange() {
      this.no -= 1;
      this.tab1 = "dash_board";
      this.tab2 = "staff";
      this.tab3 = "time_sheet";
      this.tab4 = "leaves";
    },
    async afterTabChange(tabName) {
      this.tabName = tabName;
      window.location = '/dash_board/'+tabName
    },

    // navigateBar(){
    //   window.location =
    // },
     async confirmRequest() {
      const alert = await alertController.create({
        header: 'Are you sure you want logout?',
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'Yes',
            cssClass: 'alert-button-confirm',
            handler: () => {
              this.logout()
            }
          },
          {
            text: 'No',
            cssClass: 'alert-button-cancel',
          },

        ],
      });

      await alert.present();
    },
    logout() {
      localStorage.removeItem("token");
      this.router.push("/login");
    },
  },
  setup() {
    const router = useRouter();
    return {
      no: 1,
      calendarOutline,
      cafeOutline,
      homeOutline,
      mapOutline,
      peopleOutline,
      timeOutline,
      personCircleOutline,
      logOutOutline,
      router,
      currentRoute: router.path
    };
  },
  data() {
    return {
      no: 1,
      tabName: "dash_board",
      tab1: "",
      tab2: "",
      tab3: "",
      tab4: "",
    };
  },
});
</script>
