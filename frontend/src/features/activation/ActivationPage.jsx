import React from "react";

const ActivationPage = () => {
  const isError = false;
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      {isError ? (
        <p className="text-xl text-red-500">Invalid token</p>
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
