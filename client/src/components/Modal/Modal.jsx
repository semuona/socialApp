export default function Modal({
  save,
  close,
  valueText,
  onTextChange,
  onChangeFile,
  valueImage,
}) {
  return (
    <div
      style={{
        position: "fixed",
        border: "1px solid black",
        width: "300px",
        height: "300px",
        top: "calc(100vh/2 - 150px)",
        left: "calc(100vw/2 - 150px)",
        display: "grid",
        placeContent: "center",
      }}
    >
      <h1>Modal Component:</h1>
      <h5>Please upload your image and add description</h5>
      <textarea value={valueText} onChange={onTextChange} />
      <input
        value={valueImage}
        onChange={onChangeFile}
        type="file"
        name="image"
        id="file"
      />
      <p>
        <button onClick={close}>Close</button>
        <button onClick={save}>Save</button>
      </p>
    </div>
  );
}
