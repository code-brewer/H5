import Mock from 'mockjs'

// login
Mock.mock('/mgu/tone/loginForH5', {
    'repBody': {
        'ismember': '1',
        'award|1-5': 5
    },
    'resCode': '0'
})

// send code
Mock.mock('/mgu/user/sendLoginCode', {
    'returnCode|1000-9999': 9999,
    'resCode': 0,
    'resMsg': '获取验证码失败，请重新获取'
})

// open service
Mock.mock('/mgu/tone/openMemberByNet', {
    'success|1': true
})

// start lottery
Mock.mock('/mgu/user/lottery', {
    'success|1': true
})

// 获取奖品
Mock.mock('/mgu/lucky/myPrizeDrawResult', {
    'award|0-5': 6
})