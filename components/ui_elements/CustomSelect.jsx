import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import customSelectStyles from "@/styles/components/ui_elements/customSelect.module.css";

const CustomSelect = ({
  id,
  title,
  options,
  showSelectedOptionAsTitle,
  isSearch,
  value,
  fillContainer,
  isSm,
  handleChange,
  margin,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [optionsToDisplay, setOptionsToDisplay] = useState(options);
  const [selectedOption, setSelectedOption] = useState("");

  const displayDropDown = () => {
    setShowOptions(true);
  };

  const hideDropDown = () => {
    setShowOptions(false);
  };

  const setAvailableOptions = (optionToRemove) => {
    let newOptionsToDisplay = options.filter(
      (element) => element != optionToRemove
    );

    setOptionsToDisplay(newOptionsToDisplay);
  };

  const handleOptionSelect = (e) => {
    setAvailableOptions(e.target.innerText);
    setShowOptions(false);
    setSelectedOption(e.target.innerText);

    if (isSearch) {
      document.querySelector(`#${id}input`).value = "";
    }
  };

  const searchOptions = (e) => {
    const value = e.target.value;

    let newOptionsToDisplay = options.filter((element) =>
      element.toLowerCase().includes(value.toLowerCase())
    );
    console.log(value);
    setOptionsToDisplay(newOptionsToDisplay);
  };

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
      setAvailableOptions(value);
    }
  }, []);

  return (
    <div
      className={customSelectStyles.container}
      id={id}
      style={{
        width: fillContainer ? "100%" : isSm ? "120px" : "",
        margin: margin,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {isSearch ? (
          <input
            type="text"
            className={customSelectStyles.input}
            name="optionToSearch"
            id={`${id}input`}
            onClick={displayDropDown}
            onChange={searchOptions}
            placeholder={
              showSelectedOptionAsTitle
                ? selectedOption
                  ? selectedOption
                  : title
                : title
            }
          />
        ) : (
          <span>
            {showSelectedOptionAsTitle
              ? selectedOption
                ? selectedOption
                : title
              : title}
          </span>
        )}

        {showOptions ? (
          <span onClick={hideDropDown}>
            <RiArrowDropUpLine />
          </span>
        ) : (
          <span onClick={displayDropDown}>
            <RiArrowDropDownLine />
          </span>
        )}
      </div>

      {showOptions ? (
        <div className={customSelectStyles.options}>
          {optionsToDisplay.map((element, idx) => {
            return (
              <div
                key={`${element.toString()}`}
                onClick={(e) => {
                  handleChange(e);
                  handleOptionSelect(e);
                }}
                className={customSelectStyles.option}
              >
                {element}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
