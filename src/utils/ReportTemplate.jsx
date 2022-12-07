import { ArrayConverter } from "./ArrayConverter";
import { convertIntoDoller } from "./ConvertIntoDoller";

const ReportTemplate = ({ data }) => {
  const { invoiceID, date, customer, InvoiceItems, amount, paymentType } = data;

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
      // backgroundColor: "green",
    },

    column: {
      display: "flex",
      flexDirection: "column",
      color: "black",
      width: "49%",
    },
    column1: {
      display: "flex",
      flexDirection: "column",
      color: "black",
      // backgroundColor: "lightblue",
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

    wrapView: {
      flexWrap: "wrap",
      display: "flex",
      flexDirection: "row",
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
    img: {
      width: "100px",
      height: "100px",
      borderRadius: "6px",
      marginRight: "20px",
      marginTop: "20px",
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
  };
  function toDataURL(url, callback) {
    let xhRequest = new XMLHttpRequest();
    xhRequest.onload = function () {
      let reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(xhRequest.response);
    };
    xhRequest.open("GET", url);
    xhRequest.responseType = "blob";
    xhRequest.send();
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
        {/* <img
          src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg=="
          alt="Red dot"
          style={{
            width: "100px",
            height: "100px",
          }}
        /> */}
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
        {ArrayConverter(InvoiceItems).map((item, index) => {
          return (
            <div style={styles.invoiceView}>
              <div style={styles.columnLayout}>
                {item.WeightType == "Unit" ? (
                  <>
                    <div style={styles.column}>
                      <h3 style={styles.marginb0}>
                        {index + 1}) {item.ItemName}
                      </h3>
                      <h4>Unit</h4>
                      <h4>UnitPrice</h4>
                      <h4>Total</h4>
                    </div>
                    <div style={styles.column1}>
                      <h4 style={styles.marginb0}></h4>
                      <p>{item.details.Unit}</p>
                      <p>${item.details.UnitPrice}</p>
                      <p>{convertIntoDoller(item.details.Total)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={styles.column}>
                      <h3 style={styles.marginb0}>
                        {index + 1}) {item.ItemName}
                      </h3>
                      <h4>GrossWeight</h4>
                      <h4>TareWeight</h4>
                      <h4>NetWeight</h4>
                      <h4>Price</h4>
                      <h4>Total</h4>
                    </div>
                    <div style={styles.column1}>
                      <h4 style={styles.marginb0}></h4>
                      <p>{item.details.GrossWeight}</p>
                      <p>{item.details.TareWeight}</p>
                      <p>{item.details.NetWeight}</p>
                      <p>${item.details.WeightPrice}</p>
                      <p>{convertIntoDoller(item.details.Total)}</p>
                    </div>
                  </>
                )}
              </div>
              <div style={styles.wrapView}>
                {item.IMG.map((item, index) => {
                  return (
                    <img
                      style={styles.img}
                      src={item?.base64 ? item.base64 : item.url}
                    />
                  );
                })}
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

export default ReportTemplate;
