import "../styles/globals.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
function MyApp({ Component, pageProps }) {
  return (
    <div className="main">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
