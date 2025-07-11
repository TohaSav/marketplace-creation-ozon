import { useState, useEffect } from "react";

export const useLocation = () => {
  const [city, setCity] = useState("Москва");
  const [showLocationRequest, setShowLocationRequest] = useState(false);

  useEffect(() => {
    const savedCity = localStorage.getItem("user-city");
    const locationRequested = localStorage.getItem("location-requested");

    if (savedCity) {
      setCity(savedCity);
    } else if (!locationRequested) {
      setShowLocationRequest(true);
    }
  }, []);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            let detectedCity = "Москва";

            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ru`,
              );
              const data = await response.json();
              detectedCity =
                data.city ||
                data.locality ||
                data.principalSubdivision ||
                "Москва";
            } catch (error) {
              try {
                const response2 = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ru`,
                );
                const data2 = await response2.json();
                detectedCity =
                  data2.address?.city ||
                  data2.address?.town ||
                  data2.address?.village ||
                  "Москва";
              } catch (error2) {
                console.error(
                  "Ошибка определения города через второй API:",
                  error2,
                );
              }
            }

            setCity(detectedCity);
            localStorage.setItem("user-city", detectedCity);
            localStorage.setItem("location-requested", "true");
            setShowLocationRequest(false);
          } catch (error) {
            console.error("Ошибка определения города:", error);
            localStorage.setItem("location-requested", "true");
            setShowLocationRequest(false);
          }
        },
        (error) => {
          console.error("Ошибка геолокации:", error);
          localStorage.setItem("location-requested", "true");
          setShowLocationRequest(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } else {
      localStorage.setItem("location-requested", "true");
      setShowLocationRequest(false);
    }
  };

  const declineLocation = () => {
    localStorage.setItem("location-requested", "true");
    setShowLocationRequest(false);
  };

  const selectCity = (selectedCity: string) => {
    setCity(selectedCity);
    localStorage.setItem("user-city", selectedCity);
  };

  return {
    city,
    showLocationRequest,
    requestLocation,
    declineLocation,
    selectCity,
  };
};
