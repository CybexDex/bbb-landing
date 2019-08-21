<template>
  <v-app id="inspire">
    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <v-row
                align="center"
                justify="center"
        >
          <v-col
                  cols="12"
                  sm="8"
                  md="4"
          >
            <v-card class="elevation-12">
              <v-sheet
                      width="100%"
                      height="200"
                      color="primary"
                      dark
                      tile
                      class="text-center pt-8"
              >
                <img src="/logo.png" width="100px" />
                <div class="title">BBB-全网门槛最低合约产品</div>
                <div class="caption">低手续费、低合约单价<br />下载即用，操作简单</div>
              </v-sheet>

              <v-card-text class="px-5 pb-0">
                <v-form>
                  <v-text-field
                          :label="form_label.account_name"
                          v-model="name"
                          required
                          clearable
                          type="text"
                          @input="onAccountNameChanged"
                  ></v-text-field>

                  <v-text-field
                          v-model="password"
                          :label="form_label.pwd"
                          :rules="passwordRules"
                          :type="showPassword?'text':'password'"
                          @input="onPasswordChanged"
                          clearable
                          required
                  >
                    <v-icon slot="append" v-on:click="showPassword=!showPassword">mdi-eye-outline</v-icon>
                  </v-text-field>
                  <v-text-field
                          id="password"
                          :label="form_label.pwdrpt"
                          name="passwordagain"
                          v-model="repeatpwd"
                          :rules="repeatpwdRules"
                          :type="showPassword?'text':'password'"
                          clearable
                          required
                  >
                    <v-icon slot="append" v-on:click="showPassword=!showPassword">mdi-eye-outline</v-icon>
                  </v-text-field>

                  <v-text-field
                          id="captcha"
                          :label="form_label.captcha"
                          name="captcha"
                          type="text"
                          :rules="validcodeRules"
                          required
                          clearable
                  ></v-text-field>

                  <v-text-field
                          id="refer"
                          :label="form_label.refer"
                          name="refer"
                          type="text"
                          clearable
                  ></v-text-field>

                  <v-checkbox
                          v-model="warnForgot"
                          :rules="[v => !!v || 'You must agree to continue!']"
                          :label="form_label.agree"
                          required
                  ></v-checkbox>


                </v-form>
              </v-card-text>
              <v-card-actions class="pa-5">
                <v-spacer></v-spacer>
                <v-btn color="primary" block dark v-text="form_label.register"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>



      </v-container>
    </v-content>

    <v-footer
            color="primary"
            padless
    >
      <v-row
              justify="center"
              no-gutters
      >
        <v-btn
                v-for="link in links"
                :key="link"
                color="white"
                text
                rounded
                class="my-2"
        >
          {{ link }}
        </v-btn>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
  import { debounce } from "lodash";

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer:false,
      form_label:{
        account_name: "用户名",
        pwd:"密码",
        pwdrpt:"确认密码",
        captcha: "验证码",
        refer:"推荐人",
        agree:"我确认已妥善备份即将创建的账户名称及其密码，并知晓一旦密码遗忘，将无法找回，也无法再次登陆账户或使用账户资金",
        register:"注册"
      },
      isAccountChecked: false,
      isAccountValid: false,
      isAccountNew: false,
      warnForgot: false,
      showPassword: false,
      generated: "",
      name: "",
      password: "",
      repeatpwd: "",
      captcha: "",
      nameRules: [
        // value =>
        //         !this.isAccountValid ||
        //         !!value ||
        //         this.$t("validation.account_required"),
        // value => this.checkName(value)
      ],
      passwordRules: [
        // value => this.checkPassword(value) || this.$t("validation.pwd_length")
      ],
      repeatpwdRules: [
        // value =>
        //         !this.isAccountValid ||
        //         (!!value
        //                 ? value === this.password || this.$t("validation.pwd_unmatched")
        //                 : this.$t("validation.pwd_repeat"))
      ],
      validcodeRules: [
        // value =>
        //         !this.isAccountValid ||
        //         (!!value || this.$t("validation.validcode_required"))
      ],
      inRegister: false,
      links: [
        '赛贝交易所',
        '联系我们',
        '帮助与反馈',
      ],
    }),
    methods: {
      onPasswordChanged() {
        this.$refs.form.validate();
      },
      onAccountNameChanged: debounce(async function() {
        if (!this.name) return;
        this.isAccountChecked = false;
        this.name = (this.name || "").slice(0, 64);
        try {
          this.isAccountNew = !(await this.$call(
                  this.cybexjs.get_user,
                  this.name
          ));
          this.isAccountChecked = true;
          this.$refs.form.validate();
        } catch (e) {
          this.isAccountNew = true;
          this.isAccountChecked = true;
          this.$refs.form.validate();
        }
      }, 200),
      checkPassword(value, returnBool) {
        if (!this.isAccountValid) {
          return true;
        }
        const checkLen = this.isCloudMode ? 12 : 8;
        if (!this.checkPasswordLength(value, checkLen)) {
          return returnBool ? false : this.$t("validation.pwd_too_short", {len: checkLen});
        }
        const validReg = this.isCloudMode ? this.checkPasswordComplex(value) : this.checkPasswordComplexSimpler(value);
        const invalidRegStr = this.isCloudMode ? this.$t("validation.pwd_number") : this.$t("validation.pwd_number_simple");
        if (!validReg) {
          return returnBool ? false : invalidRegStr;
        }
        if (!/^[ -~]+$/g.test(value)) {
          return returnBool ? false : this.$t("validation.pwd_wrong");
        }
        return true;
      },
      // async createAccount() {
      //   const failDeal = () => {
      //     ga("send", {
      //       hitType: "event",
      //       eventCategory: "unique",
      //       eventAction: "REGISTER_FAILED",
      //       eventLabel: this.name
      //     });
      //     try {
      //       (window._czc|| []).push(["_trackEvent", "unique", "REGISTER_FAILED", this.name]);
      //     } catch (e) {
      //       console.log(e)
      //     }
      //     this.captcha = "";
      //     this.refreshCaptch(true);
      //   };
      //   if (this.$refs.form.validate()) {
      //     let isReg = false;
      //     this.inRegister = true;
      //     await this.$eventHandle(async () => {
      //       this.$store
      //               .dispatch("auth/register", {
      //                 mode: this.registerMode,
      //                 username: this.name,
      //                 password: this.password,
      //                 codeId: this.verifyCode.id,
      //                 code: this.captcha
      //               })
      //               .then(res => {
      //                 if (res) {
      //                   if (this.isCloudMode) {
      //                     try {
      //                       ga("send", {
      //                         hitType: "event",
      //                         eventCategory: "unique",
      //                         eventAction: "REGISTER_DONE:CLOUD",
      //                         eventLabel: this.name
      //                       });
      //                       (window._czc|| []).push(["_trackEvent", "unique", "REGISTER_DONE:CLOUD", this.name]);
      //                       ga("send", {
      //                         hitType: "event",
      //                         eventCategory: "unique",
      //                         eventAction: "LOGIN_DONE:CLOUD",
      //                         eventLabel: this.name
      //                       });
      //                       (window._czc|| []).push(["_trackEvent", "unique", "LOGIN_DONE:CLOUD", this.name]);
      //                     } catch (e) {
      //                       console.log(e)
      //                     }
      //                     this.$i18n.jumpTo("/register/guide");
      //                   } else {
      //                     try {
      //                       ga("send", {
      //                         hitType: "event",
      //                         eventCategory: "unique",
      //                         eventAction: "REGISTER_DONE:BIN",
      //                         eventLabel: this.name
      //                       });
      //                       (window._czc|| []).push(["_trackEvent", "unique", "REGISTER_DONE:BIN", this.name]);
      //                     } catch (e) {
      //                       console.log(e)
      //                     }
      //                     this.$router.push(
      //                             this.$i18n.path("/settings/backup?register=true")
      //                     );
      //                   }
      //                 } else {
      //                   failDeal();
      //                 }
      //               })
      //               .catch(e => {
      //                 console.error(e);
      //                 failDeal();
      //               })
      //               .finally(() => {
      //                 this.inRegister = false;
      //               });
      //     });
      //   }
      // },
      checkName(value, returnBool) {
        let msg = "";
        if (/([^a-z0-9\-])/g.test(value)) {
          msg = this.$t("validation.account_no_sign");
        }
        if (!/^([a-z])/g.test(value)) {
          msg = this.$t("validation.account_alpha");
        }
        if (
                !value ||
                (value && value.length < 3) ||
                (value && value.length > 64)
        ) {
          if (value && value.length > 64) {
            msg = this.$t("validation.account_too_long");
          } else {
            msg = this.$t("validation.account_too_short");
          }
        }
        if (!/[0-9\-]+.*$/g.test(value)) {
          msg = this.$t("validation.account_slash");
        }
        if (!/^((?!\-\-).)*$/g.test(value)) {
          msg = this.$t("validation.account_slash_limit");
        }
        if (!/([a-z0-9])$/g.test(value)) {
          msg = this.$t("validation.account_number");
        }
        if (this.isAccountChecked && !this.isAccountNew) {
          msg = this.$t("validation.account_exists");
        }
        if (msg) {
          this.isAccountValid = false;
          return returnBool ? false : msg;
        } else {
          this.isAccountValid = this.isAccountNew;
        }
        return true;
      },
      async refreshCaptch() {
        if (this.autoRefresh) {
          clearTimeout(this.autoRefresh);
          this.autoRefresh = null;
        }
        this.autoRefresh = setTimeout(() => {
          this.refreshCaptch();
        }, 1.5 * 60 * 1000);
        let s = await this.$callmsg(this.cybexjs.verify_code);
        this.verifyCode = s;
      }
    },
  }
</script>
