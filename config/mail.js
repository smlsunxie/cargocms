
module.exports.mail = {
  type: 'ses',
  config: {
    from: '',
    provider: {
      accessKeyId: '',
      secretAccessKey: '',
    }
  },
  templete: {
    orderConfirm: {
      sendBy: 'email',
      subject: '訂單 %(orderSerialNumber)s 建立完成',
      html: `<html><body>
      <br />Hi %(username)s:

      <br />感謝你的訂購，你所購買的產品 %(productName)s 已訂購完成
      <br />訂單編號為： %(orderSerialNumber)s
      <br />收件者為： %(shipmentUsername)s
      <br />收件地址為： %(shipmentAddress)s

      <br />如果上述資料正確，請將款項 $ %(paymentTotalAmount)s 匯款至以下帳號：

      <br />銀行名稱： %(bankName)s
      <br />銀行代碼： %(bankId)s
      <br />帳號： %(accountId)s
      <br />戶名： %(accountName)s
      <br />匯款金額： $ %(paymentTotalAmount)s

      <br />匯款後請按至以下連結確認:

      <br /><a href='%(orderConfirmLink)s'>匯款確認</a>

      <br />煩請你確認。

      <br />From %(storeName)s
      </body></html>`
    },
    paymentConfirm: {
      sendBy: 'email',
      subject: '訂單 %(orderSerialNumber)s 已確認付款完成',
      text: `
      Hi %(username)s:

      您的付款已經確認，
      我們會盡快為您安排出貨事宜。

      From %(storeName)s
      `
    },
    deliveryConfirm: {
      sendBy: 'email',
      subject: '訂單 %(orderSerialNumber)s 已完成出貨',
      text: `
      Hi %(username)s:

      商品已出貨完成

      感謝你的訂購

      From %(storeName)s
      `
    },
    orderSync: {
      sendBy: 'email',
      subject: '使用者 email %(email)s 訂單查詢要求連結',
      html: `
      <br />Hi %(username)s:

      <br />請點選下列連結取得訂單資訊

      <br /><a href='%(syncLink)s'>取得訂單資訊</a>


      <br />From %(storeName)s
      `
    },
    greeting: {
      sendBy: 'email',
      subject: '歡迎 %(username)s 加入ＯＯＯ會員',
      html: `
      <p>歡迎 %(username)s 註冊 %(storeName)s ！</p>
      `
    }
  }
}
