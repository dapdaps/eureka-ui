import { memo, useMemo, useState, useEffect } from 'react';

import Notification from '@/components/notification';
import Pagination from '@/components/pagination';

import styles from './notification.module.css'

const arr = [1, 2, 3, 4, 5, 6]

const List = ({ path }: any) => {
    return <div className={styles.wrapper}>
        <div className={styles.content}>
            <div className={styles.header}>
                <div className={styles.headerTitle}>Notification</div>
                <div className={styles.headerAmount}>12</div>
            </div>
            <div>
                {
                    arr.map(item => {
                        return <Notification key={item} />
                    })
                }
            </div>
            <div className={ styles.page }>
                <Pagination
                    pageTotal={100}
                    pageIndex={2}
                    onPage={(page) => {
                        // fetchDappList(page);
                    }}
                />
            </div>
        </div>
    </div>
}

export default List