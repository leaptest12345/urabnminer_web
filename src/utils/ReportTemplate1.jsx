import { ArrayConverter } from "./ArrayConverter";
import { convertIntoDoller } from "./ConvertIntoDoller";

const ReportTemplate1 = ({ data }) => {
  const { invoiceID, date, customer, emailItems, amount, paymentType } = data;
  console.log("report template", emailItems);
  const styles = {
    page: {
      marginLeft: "5rem",
      marginRight: "5rem",
      color: "black",
      padding: "2%",
      backgroundColor: "white",
      borderRadius: "6px",
    },
    columnLayout: {
      display: "flex",
      justifyContent: "space-between",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      color: "black",
      width: "49%",
    },
    spacer2: {
      height: "2rem",
      color: "black",
    },
    marginb0: {
      marginBottom: 10,
      color: "black",
      height: "40px",
      backgroundColor: "lightgray",
      display: "flex",
      alignItems: "center",
      borderRadius: "6px",
      paddingInline: "10px",
      width: "100%",
    },
    marginb1: {
      marginBottom: 10,
      color: "black",
      height: "40px",
      backgroundColor: "lightgray",
      display: "flex",
      alignItems: "center",
      paddingInline: "10px",
      width: "22%",
    },

    text: {
      fontWeight: "bold",
      fontSize: "20px",
      display: "flex",
      flexDirection: "row",
    },
    subText: {
      fontWeight: "normal",
      fontSize: "15px",
    },
    topView: {
      marginTop: "30px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    secondTopView: {
      display: "flex",
      flexDirection: "row",
      marginTop: "30px",
      justifyContent: "space-between",
    },
    footerView: {
      width: "90%",
      backgroundColor: "whitesmoke",
      borderRadius: "6px",
    },

    footerSubView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    view: {
      padding: "10px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    invoiceView: {
      width: "90%",
      marginBottom: "30px",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    smallText: {
      width: "25%",
    },
    smallText1: {
      width: "50%",
    },
  };

  function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  return (
    <>
      <div style={styles.page}>
        <div style={styles.topView}>
          <h2 style={styles.introText}>UrbanMiner</h2>
          <div style={{ width: "50%" }}>
            <p style={styles.text}>
              Invoice:
              <p style={styles.subText}>{invoiceID}</p>
            </p>
            <p style={styles.text}>
              Date:
              <p style={styles.subText}>{date}</p>
            </p>
          </div>
        </div>
        <div style={styles.secondTopView}>
          <div>
            <p>639 Woodlyn Rd</p>
            <p>P.O.Box 1022</p>
            <p>johnson City,TN 37605</p>
            <p>Ph:(423)926-3699,Fax(423)926-3699</p>
          </div>
          <div style={{ width: "40%" }}>
            <p>{customer?.BusinessName}</p>
            <p>{customer?.BusinessEmail}</p>
            <p>{customer?.BusinessAddress}</p>
          </div>
        </div>
        <div style={styles.spacer2}></div>
        <div style={styles.row}>
          <h3 style={styles.marginb1}>
            <p style={styles.smallText1}>ItemName</p>
          </h3>
          <h3 style={styles.marginb1}>
            <p style={styles.smallText1}>QTY</p>
          </h3>
          <h3 style={styles.marginb1}>
            <p style={styles.smallText1}>Price</p>
          </h3>
          <h3 style={styles.marginb1}>
            <p style={styles.smallText1}>Amount</p>
          </h3>
        </div>
        {emailItems &&
          ArrayConverter(emailItems).map((item, index) => {
            return (
              <div style={styles.invoiceView}>
                <div style={styles.columnLayout}>
                  {item.WeightType == "Unit" ? (
                    <>
                      <div style={styles.row}>
                        <p style={styles.smallText}>{item.ItemName}</p>
                        <p style={styles.smallText}>{item.details.Unit}</p>
                        <p style={styles.smallText}>
                          ${item.details.UnitPrice}
                        </p>
                        <p style={styles.smallText}>
                          {convertIntoDoller(item.details.Total)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={styles.row}>
                        <p style={styles.smallText}>{item.ItemName}</p>
                        <p style={styles.smallText}>{item.details.NetWeight}</p>
                        <p style={styles.smallText}>
                          ${item.details.WeightPrice}
                        </p>
                        <p style={styles.smallText}>
                          {convertIntoDoller(item.details.Total)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}

        <div style={styles.footerView}>
          <div style={styles.footerSubView}>
            <div style={styles.view}>
              <h4 style={styles.marginb0}>PayementType</h4>
              <p>{paymentType}</p>
            </div>
            <div style={styles.view}>
              <h4 style={styles.marginb0}>Date</h4>
              <p>{date}</p>
            </div>
            <div style={styles.view}>
              <h4 style={styles.marginb0}>Amount Due</h4>
              <p>{convertIntoDoller(amount)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportTemplate1;
