import { convertIntoDoller } from "../ConvertIntoDoller";

export const Email2 = (data) => {
  const {
    invoiceID,
    invoiceListLength,
    date,
    customerDetail,
    emailItems,
    Amount,
    paymentType,
  } = data;
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8" />
      <title>A simple, clean, and responsive HTML invoice template</title>
  
      <style>
          .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              font-size: 16px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: #555;
          }
  
          .invoice-box table {
              width: 100%;
              line-height: inherit;
              text-align: left;
          }
  
          .invoice-box table td {
              padding: 5px;
              vertical-align: top;
          }
  
          .invoice-box table tr td:nth-child(2) {
              text-align: right;
          }
  
          .invoice-box table tr.top table td {
              padding-bottom: 20px;
          }
  
          .th_,
          .td_ {
              border-bottom: 1.5px solid black;
              padding: 0.2em;
              position: relative;
              text-align: left;
              border-radius: 0.25em;
              border-style: ;
          }
  
          .th_ {
              background: #EEE;
              border-color: #BBB;
          }
  
          .td_ {
              border-color: #BBB;
          }
  
          table.meta,
          table.balance {
              margin-top: 50px;
          }
  
          table.meta1,
          th.th1,
          td.td1 {
              border: 1px solid black;
              border-collapse: collapse;
          }
  
          table.meta2 {
              border: 1px solid black;
              width: 60%;
          }
  
          td.td2 {
  
              border-collapse: collapse;
          }
  
          th.th1,
          td.td1 {
              padding: 10px;
  
          }
  
          th.th1 {
              text-align: center;
          }
  
          .td3 {
              border-right: 1px solid black;
          }
  
          .td4 {
              border-bottom: 1px solid black;
          }
  
          table.meta3,
          th.th5,
          td.td5 {
              border-bottom: 1px solid black;
              border-left: 1px solid black;
              border-right: 1px solid black;
              border-collapse: collapse;
          }
  
          .td-right {
              text-align: right
          }
  
          .td-left {
              text-align: center;
              background-color: 'red';
          }
      </style>
  </head>
  
  <body>
      <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
              <tr class="top">
                  <td colspan="2">
                      <table>
                          <tr>
                              <td class="title">
                                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9lWiATI_iad0CplxnmAZaOpGAzg2H3EiEkg&usqp=CAU" style="width: 100%; max-width:100px" />
                              </td>
                              <td class="td-left">
                                  639 Woodlyn Rd.<br /> P.O.Box 1022<br /> johnson City,TN 37605<br /> Ph:(423)926-3699 <br /> Fax:(423) 926-6699
                              </td>
                              <td class="td-right">
                                  Invoice #:${
                                    invoiceID
                                      ? invoiceID
                                      : invoiceListLength + 1
                                  }<br /> Created:${(date + "").split("GMT")[0]}
                                  <br />
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr class="information">
                  <td colspan="2">
                      <table>
                          <tr>
  
                              <td>
                                  ${
                                    customerDetail &&
                                    customerDetail.BusinessName
                                  }<br /> ${
    customerDetail && customerDetail.BusinessEmail
  }<br /> ${customerDetail && customerDetail.BusinessAddress}
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <table style="width:100%" class="meta1">
                  <tr>
                      <th class="th1" style="width:45%">Items</th>
                      <th class="th1">Qty</th>
                      <th class="th1">Price</th>
                      <th class="th1">Amount</th>
                  </tr>
                  ${
                    emailItems.length > 0 &&
                    emailItems.map((item, index) => {
                      return item
                        ? item.WeightType == "unit"
                          ? `
                     <tr>
                      <td class="td1">${index + 1}.${item.itemName}</td>
                      <td class="td1">${
                        item.details.unit ? item.details.unit + "" : "0"
                      }</td>
                      <td class="td1">${
                        item.details.Price
                          ? convertIntoDoller(parseFloat(item.details.Price))
                          : "0"
                      }</td>
                      <td class="td1">${
                        item.details.Total
                          ? convertIntoDoller(item.details.Total)
                          : "0"
                      }</td>
                  </tr>`
                          : `
                  <tr>
                  <td class="td1">${index + 1}.${item.itemName}</td>
                  <td class="td1">${
                    item.details.NetWeight ? item.details.NetWeight + "" : "0"
                  }</td>
                      <td class="td1">${
                        item.details.Price
                          ? convertIntoDoller(parseFloat(item.details.Price))
                          : "0"
                      }</td>
                      <td class="td1">${
                        item.details.Total
                          ? convertIntoDoller(item.details.Total)
                          : "0"
                      }</td>
                     </tr>`
                        : null;
                    })
                  }
              </table>
              <table style="width:100%" class="meta3">
                  <tr>
                      <td rowspan="3" style="width:60.5%">Thank you for your business. If you have question let us know.We are always looking for ways to improve our service to you our valued customer.Plese let us know how we may better serve you </td>
                  </tr>
                 <tr>
        <td  class="td5">INVOICE TOTAL:${convertIntoDoller(Amount)}</td>
       
      </tr>
      <tr>
        <td  class="td5">PAYMENT DUE:$0.00</td>
                      </tr>
  
              </table>
              ${
                paymentType &&
                date &&
                Amount &&
                `
              <table class="meta">
                  <tr>
                      <th class='th_'><span contenteditable>PaymentType</span></th>
                      <th class='th_'><span contenteditable>Date</span></th>
                      <th class='th_'><span contenteditable>Amount Due</span></th>
                  </tr>
                  <tr>
                      <td class="td_">${paymentType}</td>
                      <td class="td_">${(date + "").split("GMT")[0]}</td>
                      <td class="td_">${convertIntoDoller(Amount)}</td>
                  </tr>
              </table>`
              }
      </div>
  </body>
  </html>`;
};
