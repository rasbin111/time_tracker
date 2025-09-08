const update_times_in_string =  (time_string, additional_seconds) => {
    let [hours, minutes, seconds] = time_string.split(':').map(Number);
    let total_seconds = hours * 3600 + minutes * 60 + seconds + additional_seconds;

    hours = Math.floor(total_seconds / 3600);
    total_seconds %= 3600;
    minutes = Math.floor(total_seconds / 60);
    seconds = total_seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export { update_times_in_string };