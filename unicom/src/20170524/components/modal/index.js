//活动规则
import rule from './rule/rule.vue'
//订购失败
import error from './error/error.vue'

//非会员
import NonMembersOne from './NonMembers/one.vue'
import NonMembersTwo from './NonMembers/two.vue'

//会员
import MembersIsLottery from './members/isLottery.vue'
import MembersSuccess from './members/success.vue'
import MembersForm from './members/form.vue'
import MembersCRBTIndex from './members/CRBTIndex.vue'
import MembersCRBTConfirm from './members/CRBTConfirm.vue'
import MembersCRBTSuccess from './members/CRBTSuccess.vue'

//登录
import login from './login/login.vue'

//我的奖品
import myPrizeNone from './myPrize/none.vue'
import myPrizeForm from './myPrize/form.vue'
import myPrizeSuccess from './myPrize/success.vue'
import myPrizeIsRegister from './myPrize/isRegister.vue'
import myPrizeRegisterSuccess from './myPrize/registerSuccess.vue'
export default {
	components: {
		rule,

		error,

		NonMembersOne,
		NonMembersTwo,

		MembersIsLottery,
		MembersSuccess,
		MembersForm,
		MembersCRBTIndex,
		MembersCRBTConfirm,
		MembersCRBTSuccess,

		login,

		myPrizeNone,
		myPrizeForm,
		myPrizeSuccess,
		myPrizeIsRegister,
		myPrizeRegisterSuccess
	},
	data() {
		return {
			currentModal: 'rule',
			isModalShow: false,
			modalOptions: {
				//触发弹窗的来源
				source: '',
				//奖品信息
				prizeName: '',
				prizeImg: '',
				isInvented: false,
				//炫铃信息
				musicImg: ''
			}
		}
	},
	methods: {
		showModal(type, obj) {
			this.isModalShow = false;
			this.currentModal = type;

			this.modalOptions = obj || {};

			this.$nextTick(() => {
				this.isModalShow = true;
			})
		},
		close(val) {
			this.isModalShow = val;
		}
	}
}