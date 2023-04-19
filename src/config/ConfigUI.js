const configSlugify = { locale: "vi", lower: true };

const configToast = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const configSelectStyle = {
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  control: (base) => ({
    ...base,
    // border: 0,
    // This line disable the blue border
    boxShadow: "none",
    border: "2px solid #c2c2c2 !important",
    borderRadius: "5px",
    height: "50px",
    minHeight: "50px",
    color: "black !important",
    // padding: "0 8px !important",
    // margin: "0 !important",
    "&:focus-within": {
      // borderColor: "#f7c6b9",
      // borderColor: "#c6c6c6",
      // boxShadow: "0 0 0.2rem rgba(233, 105, 71, 0.25)",
      // border: "2px solid black",
    },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "black" : isSelected ? "#fff" : "#fff",
    color: isFocused ? "#fff" : isSelected ? "black" : "black",
    zIndex: 1,
    fontWeight: "bold",
    fontSize: "14px",
    padding: "10px 20px",

    "&:active": {
      background: isFocused ? "black" : isSelected ? "#fff" : "#fff",
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "50px",
    padding: "0 20px",
    fontSize: "14px",
    color: "black !important",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
    height: "50px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
    height: "50px",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "50px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
    fontWeight: "bold",
  }),

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      fontWeight: "bold",
    };
  },
};

const configFullOptionSunEditor = {
  katex: "window.katex",
  buttonList: [
    [
      "undo",
      "redo",
      "font",
      "fontSize",
      "formatBlock",
      "paragraphStyle",
      "blockquote",
      "bold",
      "underline",
      "italic",
      "strike",
      "subscript",
      "superscript",
      "fontColor",
      "hiliteColor",
      "textStyle",
      "removeFormat",
      "outdent",
      "indent",
      "align",
      "horizontalRule",
      "list",
      "lineHeight",
      "table",
      "link",
      "image",
      "video",
      "audio",
      "math",
      "imageGallery",
      "fullScreen",
      "showBlocks",
      "codeView",
      "preview",
      "print",
      "save",
      "template",
    ],
  ],
};

export {
  configSlugify,
  configToast,
  configSelectStyle,
  configFullOptionSunEditor,
};
