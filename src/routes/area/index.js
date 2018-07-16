import React from 'react';
import { Page } from 'components'
import { Row, Col, Button, Popconfirm } from 'antd'
import {routerRedux} from "dva/router";
import queryString from "query-string";
import List from './List'
import {connect} from "dva";

const Area = ({
                location, dispatch, area, loading
              }) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination
  } = area

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['/area/query'],
    pagination,
    location,
    onChange(page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  }

  return (
    <Page inner>
      <List {...listProps} />
    </Page>
  )
};

export default connect(({ area, loading }) => ({ area, loading }))(Area)
