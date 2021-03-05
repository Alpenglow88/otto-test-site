const axios = require("axios")


async function checkCountry() {
    const ipCheckCountry = browser.call(() => {
      const getData = async () => {
        var config = {
          method: "get",
          url: "https://extreme-ip-lookup.com/json/",
        };
        try {
          return await axios(config);
        } catch (error) {
          console.error(error);
        }
      };
      const getCountry = async () => {
        const response = await getData();
        return response.data.country;
      };
      return getCountry();
    });
    console.log(checkCountry())
    }
    

