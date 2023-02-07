import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

function JsonComponent({ id, isViewOnly, schema, onChange }) {
  return (
    <JSONInput
      confirmGood={false}
      id={id}
      viewOnly={isViewOnly}
      colors={{
        string: "#DAA520",
      }}
      placeholder={schema}
      onChange={onChange}
      locale={locale}
      height="550px"
      width="100%"
    />
  );
}

export default JsonComponent;
