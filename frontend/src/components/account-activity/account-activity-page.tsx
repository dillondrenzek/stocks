import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AccountActivityTable } from './table/account-activity-table';
import { AccountActivityApi } from '../../api/account-activity-api';

function useAccountActivityItems() {
  const [accountActivityItems, setAccountActivityItems] = useState([]);

  useEffect(() => {
    AccountActivityApi.getAccountActivity((items) => {
      setAccountActivityItems(items);
    });
  }, []);

  return {
    accountActivityItems
  }
}

export function AccountActivityPage(props) {
  const { accountActivityItems } = useAccountActivityItems();

  return (
    <Container fluid>
      <Row>
        <Col>

          <h3>Account Activity</h3>
          <AccountActivityTable
            items={accountActivityItems}
          />

        </Col>
      </Row>
    </Container>
  );
}
