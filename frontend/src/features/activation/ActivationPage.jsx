import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useActivate } from "./activateUser";

const ActivationPage = () => {
  const [params] = useSearchParams();
  const activationToken = params.get("activationToken");

  const { error, isError, isLoading, activate } = useActivate();

  useEffect(() => {
    if (activationToken) {
      activate({ activationToken });
    }
  }, [activationToken]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      {isError ? (
        <p className="text-xl text-red-500">{error.data.message}</p>
      ) : (
        <>
          <p className="text-xl">Your Account has been created successfully</p>
          <p className="text-xl mt-2">
            Close this window and return to login screen
          </p>
        </>
      )}
    </div>
  );
};

export default ActivationPage;
