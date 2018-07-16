import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import queryString from 'query-string'
import styles from './List.less'

const List = ({
  location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const columns = [
    {
      title: 'areaCode',
      dataIndex: 'areaCode',
      key: 'areaCode',
    }, {
      title: 'areaName',
      dataIndex: 'areaName',
      key: 'areaName'
    }, {
      title: 'areaShortName',
      dataIndex: 'areaShortName',
      key: 'areaShortName',
    }, {
      title: 'areaType',
      dataIndex: 'areaType',
      key: 'areaType',
      // render: text => (<span>{text == '0'? '0': 'Female'}</span>),
    }, {
      title: 'parentCode',
      dataIndex: 'parentCode',
      key: 'parentCode',
    }, {
      title: 'pinYin',
      dataIndex: 'pinYin',
      key: 'pinYin',
    }, {
      title: 'created',
      dataIndex: 'created',
      key: 'created',
    }, {
      title: 'updated',
      dataIndex: 'updated',
      key: 'updated',
    }
  ]

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table)}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.id}
    />
  )
}

List.propTypes = {
  location: PropTypes.object,
}

export default List
