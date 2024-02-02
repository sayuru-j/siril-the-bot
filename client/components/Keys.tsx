import { useEffect, useState } from "react";
import IconRenderer from "./UI/Icons";

interface KeysProps {
  isSelected: boolean;
}

type Key = {
  _id: string;
  description: string;
  apiKey: string;
  isActive: boolean;
  createdAt: Date;
};

const baseUrl = "http://192.168.3.217:8000";

type SelectedItem = {
  name: string;
  isSelected: boolean;
};

export default function Keys({ isSelected }: KeysProps) {
  const [isKeyChanged, setIsKeyChanged] = useState<boolean>(false);
  const [isKeyDisplayed, setIsKeyDisplayed] = useState<SelectedItem>({
    name: "",
    isSelected: false,
  });

  const [keyList, setKeyList] = useState<Key[]>();

  async function fetchKeys() {
    try {
      const response = await fetch(`${baseUrl}/config/openai/keys`, {
        method: "GET",
      });

      const { data } = await response.json();

      setKeyList(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function onActivate({ keyId }: { keyId: string }) {
    try {
      const response = await fetch(
        `${baseUrl}/config/openai/keys/activate?keyId=${keyId}`,
        {
          method: "PATCH",
        }
      );

      if (response.status === 200) {
        setIsKeyChanged(!isKeyChanged);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchKeys();
  }, [isKeyChanged]);

  return (
    <div className="flex gap-8 flex-wrap">
      {keyList?.map((key) => (
        <div
          className="flex flex-col justify-between border-2 border-black rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,1)] lg:h-[120px] lg:w-[400px] w-full min-h-[100px]"
          key={key._id}
        >
          <div className="flex items-center justify-between px-5 py-2">
            <p className="font-semibold">{key.description}</p>
            <div>
              {key.isActive ? (
                <div className="h-3 w-3 bg-secondary-accent shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-full animate-pulse" />
              ) : (
                <button
                  onClick={() => onActivate({ keyId: key._id })}
                  type="button"
                  className="border-2 bg-accent-3 border-black rounded-full px-2 text-xs shadow-[2px_3px_0px_rgba(0,0,0,1)] inline-flex items-center justify-center gap-1"
                >
                  <h2>Activate</h2>
                  <IconRenderer iconName="key-off" iconSize="sm" />
                </button>
              )}
            </div>
          </div>
          <div
            className={`${
              key.isActive ? "bg-secondary-accent/80 " : "bg-accent-3/80"
            } px-5 py-2 w-full border-t-2 border-black rounded-b-lg flex flex-col break-all`}
          >
            <div className="inline-flex w-full font-bold text-sm">
              {isKeyDisplayed.name === key.description &&
              isKeyDisplayed.isSelected ? (
                ""
              ) : (
                <div className="flex w-full items-center justify-between">
                  <button
                    onClick={() =>
                      setIsKeyDisplayed({
                        name: key.description,
                        isSelected: !isKeyDisplayed.isSelected,
                      })
                    }
                    type="button"
                  >
                    View
                  </button>
                  <button
                    title="DeleteBtn"
                    type="button"
                    className="opacity-0 hover:opacity-80 transition-all duration-300 ease-in-out"
                  >
                    <IconRenderer iconName="delete" />
                  </button>
                </div>
              )}
            </div>
            <div>
              {isKeyDisplayed.name === key.description &&
                isKeyDisplayed.isSelected && (
                  <div className="flex flex-col gap-2 text-xs break-before-auto">
                    <div className="font-bold w-full inline-flex items-center justify-between">
                      <h2>API Key</h2>
                      <h2>
                        <IconRenderer iconName="copy" iconSize="sm" />
                      </h2>
                    </div>
                    <p className="">{key.apiKey}</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
