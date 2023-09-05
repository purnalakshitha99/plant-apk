<template>
  <ion-page>
    <ion-content class="login-wrap">
      <ion-grid>
        <ion-row style="padding-top: 15px; align-items: center;">
          <ion-col>
            <!-- <ion-img class="ion-float-center" routerLink="/" routerDirection="root"
              src="https://i.postimg.cc/Qd2tjq17/m.png" style="width:50%" /> -->
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text>
              <h2 style="text-align: center; margin-top: 10%;">Register</h2>
            </ion-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-align-items-center ion-justify-content-center" style="margin-top: 1vh;">
          <div style="border:solid 1px; border-radius: 4px; width:90vw;">
            <ion-row>
              <ion-col class="ion-align-self-center" size="1">
                <ion-icon :icon="peopleCircle"></ion-icon>
              </ion-col>
              <ion-col class="ion-align-items-center">
                <ion-input v-model="first_name" name="first_name" placeholder="First Name">
                </ion-input>
              </ion-col>
            </ion-row>
          </div>
        </ion-row>
        <ion-row v-show="first_nameError" class="ion-text-start" style="padding-left: 10px">
          <ion-col>
            <ion-text color="danger">
              <span>{{ first_nameError }}</span>
            </ion-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-align-items-center ion-justify-content-center" style="margin-top: 1vh;">
          <div style="border:solid 1px; border-radius: 4px; width:90vw;">
            <ion-row>
                            <ion-col class="ion-align-self-center" size="1">
                              <ion-icon :icon="peopleCircle"></ion-icon>
                            </ion-col>
              <ion-col class="ion-align-items-center">
                <ion-input v-model="last_name" name="last_name" placeholder="Last Name">
                </ion-input>
              </ion-col>
            </ion-row>
          </div>
        </ion-row>

        <ion-row v-show="last_nameError" class="ion-text-start" style="padding-left: 10px">
          <ion-col>
            <ion-text color="danger">
              <span>{{ last_nameError }}</span>
            </ion-text>
          </ion-col>
        </ion-row>

        <ion-row class="ion-align-items-center ion-justify-content-center">
          <div style="border:solid 1px; border-radius: 4px; width:90vw; margin-top: 3vh; ">
            <ion-row>
              <ion-col class="ion-align-self-center" size="1">
                <ion-icon :icon="mailOutline" />
              </ion-col>
              <ion-col class="ion-align-items-center">
                <ion-input v-model="email" name="email" placeholder="Email Address" required autocomplete="email" />
              </ion-col>
            </ion-row>
          </div>
        </ion-row>
        <ion-row v-show="emailError" class="ion-text-start" style="padding-left: 10px">
          <ion-col>
            <ion-text color="danger">
              <span>{{ emailError }}</span>
            </ion-text>
          </ion-col>
        </ion-row>


        <ion-row class="ion-align-items-center ion-justify-content-center" style="margin-top: 1vh;">
          <div style="border:solid 1px; border-radius: 4px; width:90vw;">
            <ion-row>
              <ion-col class="ion-align-self-center" size="1">
                <ion-icon :icon="lockClosedOutline"></ion-icon>
              </ion-col>
              <ion-col class="ion-align-items-center">
                <ion-input v-model="password" :type="passwordFieldType" name="password" placeholder="Password" autocomplete="password">
                </ion-input>
              </ion-col>

              <ion-col v-show="password" id="eyeIcon" class="ion-align-self-center" size="1">
                <ion-icon v-if="passwordFieldType !== 'password'" :icon="eye" @click="passwordTongle" />
                <ion-icon v-else :icon="eyeOff" @click="passwordTongle" />
              </ion-col>
            </ion-row>
          </div>
        </ion-row>
        <ion-row v-show="passwordError" class="ion-text-start" style="padding-left: 10px">
          <ion-col>
            <ion-text color="danger">
              <span>{{ passwordError }}</span>
            </ion-text>
          </ion-col>
        </ion-row>



        <div style="display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  right: -0.4px;
                  border-radius: 4px;">
          <ion-row class="ion-align-items-center ion-justify-content-center">
            <ion-col style="">
              <ion-button :disabled="is_btn_loading" expand="full" style="height: 50px;" @click="submit">
                <ion-spinner name="circles" :hidden="!is_btn_loading"></ion-spinner>
                REGISTER
              </ion-button>
            </ion-col>
          </ion-row>

        </div>
        <ion-row>
          <ion-col>
            <div class="ion-text-center ion-margin-top">
              <span>
                <p @click="() => router.push('/login')">
                  Back to login?
                </p>
              </span>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from "vue-router";
import {eye, eyeOff, lockClosedOutline, mailOutline, peopleCircle} from 'ionicons/icons';
import { defineRule, useField, useForm } from 'vee-validate';
import authAPI from '../../apis/modules/auth_api'
// import {toast} from "@/common/toast";

/*dis*/
export default defineComponent({
  name: 'register',
  components: {
    IonSpinner,
    IonGrid,
    IonText,
    IonIcon,
    IonThumbnail,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonToolbar,
    IonFooter,
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
    IonCol,
    IonRow,
    IonPage,

  },
  data() {
    return {
      is_btn_loading: false,
      v: "",
      errors: "",
      email: "",
      password: "",
      passwordFieldType: "password",
      first_name:""

    };
  },
  setup() {
    // validation rules

    // require
    defineRule('requiredEmail', value => {
      if (!value || !value.length) {
        return 'The Email field is required';
      }
      return true;
    });

    defineRule('requiredFirstName', value => {
      if (!value || !value.length) {
        return 'The First Name field is required';
      }
      return true;
    });

    defineRule('requiredLastName', value => {
      if (!value || !value.length) {
        return 'The Last Name field is required';
      }
      return true;
    });

    defineRule('requiredPassword', value => {
      if (!value || !value.length) {
        return 'The Password field is required';
      }
      return true;
    });

    // checking valid email
    defineRule('email', email => {
      if (!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(email)) {
        return 'Please enter valid email address';
      }
      return true;
    })

    // checking valid email
    defineRule('password', password => {
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/.test(password)) {
        return 'Your password must contain at least one uppercase, one lowercase, one special character and one digit';
      }
      return true;
    })

    function validation() {
      return theForm.validate();
    }

    const schema = {
      email: 'requiredEmail|email',
      password: 'requiredPassword',
      first_name: 'requiredFirstName',
      last_name: 'requiredLastName'

    };

    // Create a form context with the validation schema
    const theForm = useForm({
      validationSchema: schema,
    });

    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField('email');
    const { value: first_name, errorMessage: first_nameError } = useField('first_name');
    const { value: last_name, errorMessage: last_nameError } = useField('last_name');
    const { value: password, errorMessage: passwordError } = useField('password');

    const router = useRouter();
    return {
      validation,
      emailError,
      first_nameError,
      last_nameError,
      first_name,
      last_name,
      passwordError,
      email,
      password,
      router,
      lockClosedOutline,
      mailOutline,
      peopleCircle,
      eye,
      eyeOff
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'eyeOff' : 'eye'
    }
  },
  methods: {
    async submit() {
      this.v = (await this.validation());
      if (this.v.valid) {
        await this.Login();
      }
    },
    async Login() {
      try {
        this.is_btn_loading = true
        let payload = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        }
        let respond = (await authAPI.register(payload)).data
        console.log(respond)
        localStorage.setItem('user', JSON.stringify(respond))
        this.successToast('You are registered successfully')
        window.location = '/dash_board'
      } catch (e) {
        await this.dangerToast(e.message)
      }
      
      this.is_btn_loading = false
    },

    passwordTongle() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }

  },
});
</script>

<style scoped>
:root {
  --ion-safe-area-top: 20px;
  --ion-safe-area-bottom: 22px;
}

.auth-form ion-row {
  height: 100%;
  justify-content: center;
}

.already {
  display: block;
  text-align: center;
  padding-bottom: 10px;
}

ion-icon {
  font-size: 20px;
  padding: 5px;
}

.center {
  margin-left: 2vh;
  margin-right: 4vh;
}

ion-button {
  --background: #00C49A;
  height: 5vh;
  width: 90vw;
  margin: 15px;
}

ion-item {
  --highlight-color-focused: none;
  --focused: none;
}

#eyeIcon {
  margin-right: 10px;
  margin-top: 5px;
}
</style>

