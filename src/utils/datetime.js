import momentTimezone from 'moment-timezone';

export const timeFormat = (tick, timezone) => {
    return momentTimezone(tick).tz(timezone).format("HH:mm:ss");
};

export const dateTimeFormat = (tick, timezone) => {
    return momentTimezone(tick).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
};