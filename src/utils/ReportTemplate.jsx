import { defautlUrl } from "./constants/commonConst";

const ReportTemplate = ({ invoiceItems }) => {
  const styles = {
    page: {
      marginLeft: "5rem",
      marginRight: "5rem",
      color: "black",
    },

    columnLayout: {
      display: "flex",
      justifyContent: "space-between",
      margin: "3rem 0 5rem 0",
      gap: "2rem",
      color: "black",
    },

    column: {
      display: "flex",
      flexDirection: "column",
      color: "black",
    },

    spacer2: {
      height: "2rem",
      color: "black",
    },

    fullWidth: {
      width: "100%",
      color: "black",
    },

    marginb0: {
      marginBottom: 0,
      color: "black",
    },
  };
  return (
    <>
      <div style={styles.page}>
        <div>
          <h1 style={styles.introText}>
            Report Heading That Spans More Than Just One Line
          </h1>
        </div>
        <div style={styles.spacer2}></div>
      </div>
      <div style={styles.page}>
        <div>
          <h2 style={styles.introText}>
            Report Heading That Spans More Than Just One Line
          </h2>
        </div>
        <div style={styles.columnLayout}>
          <div style={styles.column}>
            <h4 style={styles.marginb0}>Subtitle One</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div style={styles.column}>
            <h4 style={styles.marginb0}>Subtitle Two</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div style={styles.columnLayout}>
          <div style={styles.column}>
            <h4 style={styles.marginb0}>Subtitle One</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div style={styles.column}>
            <h4 style={styles.marginb0}>Subtitle Two</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportTemplate;
