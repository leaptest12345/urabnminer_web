import React, { useState } from "react";
import {
  Container1,
  Container2,
  SelectableView,
  SettingContainer,
} from "../styles/Settings.styles";
import { Bold_1, Wrapper } from "../utils/GlobalStyles";
import PrivacyPolicy from "./PrivacyPolicy";
import ResetPassword from "./ResetPassoword";
import TermConditions from "./TermConditions";

export default function Settings() {
  const [settings, setSettings] = useState(0);
  return (
    <Wrapper>
      <SettingContainer>
        <Container1>
          <SelectableView
            background={settings == 0 ? "black" : null}
            onClick={() => setSettings(0)}
          >
            <Bold_1>Reset Password</Bold_1>
          </SelectableView>
          <SelectableView
            background={settings == 1 ? "black" : null}
            onClick={() => setSettings(1)}
          >
            <Bold_1>Privacy Policy</Bold_1>
          </SelectableView>
          <SelectableView
            background={settings == 2 ? "black" : null}
            onClick={() => setSettings(2)}
          >
            <Bold_1>Term & Conditions</Bold_1>
          </SelectableView>
        </Container1>
        <Container2>
          {settings == 0 ? (
            <ResetPassword />
          ) : settings == 1 ? (
            <PrivacyPolicy />
          ) : (
            <TermConditions />
          )}
        </Container2>
      </SettingContainer>
    </Wrapper>
  );
}
