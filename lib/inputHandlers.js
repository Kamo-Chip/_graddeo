export const handleInputChange = (e, details, setDetails) => {
  const source = e.target.id;
  const { value } = e.target;

  setDetails({ ...details, [source]: value });
};

export const handleSelectChange = (e, details, setDetails) => {
  const source = e.target.parentElement.parentElement.id;
  const value = e.target.innerText;

  setDetails({ ...details, [source]: value });
};
