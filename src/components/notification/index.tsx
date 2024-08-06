import styles from './notification.module.css'

export default function Notification() {
    return <div className={ styles.wrapper }>
        <div className={ styles.content }>
            <img className={ styles.icon } src="https://s3.amazonaws.com/dapdap.prod/images/dapdap_default_avatar.png"/>
            <div className={ styles.descContent }>
                <div className={ styles.title }>New achievement!</div>
                <div className={ styles.subTtitle }>Congrats! You’ve got the ‘10 Days Streak’ medal.</div>
            </div>
        </div>
        
        <div className={ styles.time }>
            <div className={ styles.dot }></div>
            <div className={ styles.timeText }>2 hours ago</div>
        </div>
    </div>
}