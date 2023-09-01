import { Card, Page, Layout, TextContainer, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function PageName() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar
        title={t("Shopify")}
        primaryAction={{
          content: t("Logout"),
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: t("Checkout"),
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        
        <Layout.Section>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              {t("Home Page")}
            </Text>
            <TextContainer>
              <p>{t("PageName.body")}</p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              {t("Active Deals")}
            </Text>
            <TextContainer>
              <p>{t("Click Here")}</p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              {t("Collections")}
            </Text>
            <TextContainer>
              <p>{t("Items")}</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
