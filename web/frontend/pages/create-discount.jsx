import { Layout, Page, Card, ResourceList, Text, Checkbox, LegacyStack } from '@shopify/polaris';
import React, { useEffect, useState } from "react";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";



const CreateDiscount = () => {
  const [products] = useState([
    { id: 1, title: 'Item 1', price: '150.00 PHP', discount: 0 },
    { id: 2, title: 'Item 2', price: '500.00 PHP', discount: 0 },
    { id: 3, title: 'Item 3', price: '900.00 PHP', discount: 0 },
    { id: 4, title: 'Item 5', price: '1200.00 PHP', discount: 0 },
    { id: 4, title: 'Item 5', price: '1,500.00 PHP', discount: 0 },
  ]);
  const fetch = useAuthenticatedFetch();
  const fetchCollection = async() => {

try{
  const response = await fetch("/api/collections/446628561203");
  console.log(await response.json());
}
catch(err){
  console.log(err);
}

  }
  fetchCollection();
  // const {
  //   data,
  //   refetch: refetchProductCount,
  //   isLoading: isLoadingCount,
  //   isRefetching: isRefetchingCount,
  // } = useAppQuery({
  //   url: "/api/collections",
  //   reactQueryOptions: {
  //     onSuccess: () => {
  //       setIsLoading(false);
  //     },
  //   },
  // });

  const [applyDiscount, setApplyDiscount] = useState(false);
  const [applyAnotherDiscount, setApplyAdditionalDiscount] = useState(false);

  const handleDiscountChange = () => {
    setApplyDiscount(!applyDiscount);
    setApplyAdditionalDiscount(false);
  };

  const handleAnotherDiscountChange = () => {
    setApplyAdditionalDiscount(!applyAnotherDiscount);
    setApplyDiscount(false);
  };

  const calculateDiscountedPrice = (price, discount) => {
    const originalPrice = parseFloat(price.replace('₱', ''));
    const discountAmount = originalPrice * (discount / 100);
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice.toFixed(2);
  };

  const totalDiscount = applyDiscount ? 10 : 0;
  const anotherDiscount = applyAnotherDiscount ? 50 : 0;

  return (
    <Page>     
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'Product', plural: 'Products' }}
              items={products}
              renderItem={(product) => {
                const { id, title, price } = product;
                const discountedPrice = calculateDiscountedPrice(price, totalDiscount);
                const showDiscountedPrice = applyDiscount && totalDiscount > 0;
                const additionalDiscountedPrice = calculateDiscountedPrice(price, anotherDiscount);
                const showAdditionalDiscountedPrice = applyAnotherDiscount && anotherDiscount > 0;
                return (
                  <ResourceList.Item id={id} accessibilityLabel={`View details for ${title}`}>
                    <h3>
                      <Text variation="strong">{title}</Text>
                    </h3>
                    <div>
                      <LegacyStack>
                        <LegacyStack.Item fill>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ textDecoration: showAdditionalDiscountedPrice ? 'line-through' : showDiscountedPrice ? 'line-through' : 'none', 
                            color:  showAdditionalDiscountedPrice ? '#888888' : showDiscountedPrice ? '#888888' : 'inherit' }}>
                              {price}
                            </div>
                            {showDiscountedPrice && (
                              <div style={{ marginLeft: '10px', fontSize: '0.9em' }}>{`₱${discountedPrice}`}</div>
                            )}
                            {showAdditionalDiscountedPrice && (
                              <div style={{ marginLeft: '10px', fontSize: '0.9em' }}>{`₱${additionalDiscountedPrice}`}</div>
                            )}
                          </div>
                        </LegacyStack.Item>
                      </LegacyStack>
                    </div>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Card.Section>
              <Checkbox
                label="Apply 10% discount"
                checked={applyDiscount}
                onChange={handleDiscountChange}
              />            
            </Card.Section>
            <Card.Section>
              <Checkbox
                label="Apply 50% discount"
                checked={applyAnotherDiscount}
                onChange={handleAnotherDiscountChange}
              />            
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default CreateDiscount;