import countries from "world-countries";
const formattedCountries = countries.map((country) => {
  if (country.cca2 === "IL")
    return {
      value: "PS",
      label: "Palastine",
      flag: "🇵🇸",
      latlng: country.latlng,
      region: country.region + " " + "(We Stand With Palastine)",
    };
  return {
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  };
});

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return { getByValue, getAll };
};

export default useCountries;
