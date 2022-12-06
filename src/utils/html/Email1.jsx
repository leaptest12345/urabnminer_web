import { convertIntoDoller } from "../ConvertIntoDoller";

export default function Email1(data) {
  const { invoiceID, date, customer, InvoiceItems, amount, paymentType } = data;
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
    
          .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
          }
    
          .invoice-box table tr.information table td {
            padding-bottom: 40px;
          }
          .invoice-box table tr.heading td {
            background: 	#eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
          }
          .invoice-box table tr.details td {
            padding-bottom: 20px;
          }
    
          .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
          }
    
          .invoice-box table tr.item.last td {
            border-bottom: none;
          }
    
          .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
          }
    
          @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
              width: 100%;
              display: block;
              text-align: center;
            }
    
            .invoice-box table tr.information table td {
              width: 100%;
              display: block;
              text-align: center;
            }
          }
    
          /** RTL **/
          .invoice-box.rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          }
    
          .invoice-box.rtl table {
            text-align: right;
          }
    
          .invoice-box.rtl table tr td:nth-child(2) {
            text-align: left;
          }
          .th_, .td_ {  border-bottom: 1.5px solid black; padding: 0.2em; position: relative; text-align: left; border-radius: 0.25em; border-style: ; }
  
          .th_ { background: #EEE; border-color: #BBB;}
          .td_ {  border-color: #BBB; }
          table.meta, table.balance {  margin-top:50px;}
  
          .img{
            border-radius: 8px;
            margin:10px 10px 40px 10px
          }
          
          .invoice-box table tr.item td:nth-child(1) {
            font-weight: bold;
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
    
                    <td>
                      Invoice #::${invoiceID}<br />
                      Created:${(date + "").split("GMT")[0]}<br />
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
                    639 Woodlyn Rd.<br />
                    P.O.Box 1022<br />
                    johnson City,TN 37605<br />
                    Ph:(423)926-3699 <> Fax:(423) 926-6699
                    </td>
                     <td>
                       ${customer && customer.BusinessName}<br />
                       ${customer && customer.BusinessEmail}<br />
                       ${customer && customer.BusinessAddress}
                     </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${InvoiceItems.map((item, index) => {
              return item
                ? item.WeightType == "Unit"
                  ? `<table><tr class="heading">
               <td>${index + 1}.Item</td>
              <td>${item.ItemName}</td>
             </tr>
            <tr class="item">
            <td>Unit</td>
             <td>${item.details.Unit}</td>
           </tr>
          <tr class="item last">
            <td>Price</td>
            <td>${convertIntoDoller(parseFloat(item.details.Price))}</td>
          </tr>
          <tr class="total">
            <td></td>
            <td>Total: ${convertIntoDoller(
              parseFloat(item.details.Unit) * parseFloat(item.details.Price)
            )}</td>
          </tr>
         </table>
         ${
           item.images
             ? item.images.map((item1) => {
                 return item1
                   ? `<img src=${item1.url} class="img" alt="" width="120" height="120">`
                   : `<h></h>`;
               })
             : `<h></h>`
         }
          `
                  : `<table><tr class="heading">
          <td>${index + 1}.Item</td>
          <td>${item.ItemName}</td>
        </tr>
        <tr class="item">
          <td>GorssWeight</td>
          <td>${item.details.grossWeight}</td>
        </tr>
        <tr class="item">
          <td>TareWeight</td>
          <td>${item.details.tareWeight}</td>
        </tr>
       <tr class="item">
          <td>NetWeight</td>
          <td>${
            parseFloat(item.details.grossWeight) -
            parseFloat(item.details.tareWeight)
          }</td>
        </tr>
        <tr class="item last">
        <td>Price</td>
        <td>${convertIntoDoller(parseFloat(item.details.Price))}</td>
      </tr>
      <tr class="total">
        <td></td>
        <td>Total: ${convertIntoDoller(
          (parseFloat(item.details.grossWeight) -
            parseFloat(item.details.tareWeight)) *
            parseFloat(item.details.Price)
        )}</td>
      </tr>
     </table>
     ${
       item.images
         ? item.images.map((item1) => {
             return item1
               ? `<img src=${item1.url} class="img" alt="" width="120" height="120">`
               : `<h></h>`;
           })
         : `<h></h>`
     }
      `
                : `<h></h>`;
            })}
          </table>
          ${
            paymentType &&
            date &&
            amount &&
            `<table class="meta" >
          <tr >
            <th class='th_'><span contenteditable>PaymentType</span></th>
            <th class='th_'><span contenteditable>Date</span></th>
            <th class='th_'><span contenteditable>amount Due</span></th>
          </tr>
            <tr>
            <td class="td_">${paymentType}</td>
            <td class="td_">${(date + "").split("GMT")[0]}</td>
            <td class="td_">${convertIntoDoller(amount)}</td>
          </tr>
        </table>`
          }
          </div>
      </body>
    </html>`;
}
