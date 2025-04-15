function formatDate(date) {
    return new Date(date).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDates(messages) {
    if (messages) {
        messages.forEach(message => {
            message.formattedDate = formatDate(message.created_at);
        });
    } else {
        console.log('No messages found');
    }
}

module.exports = {formatDates };