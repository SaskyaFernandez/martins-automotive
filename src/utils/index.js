require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {
    google
} = require('googleapis');

const app = express();

let corsWhitelist = [
    "http://localhost:3000",
]

var corsOptions = {
    origin: (origin, callback) => {
        if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false)
        }
    }
}

function securityMiddleware(req, res, next) {
    if (DEV || process.env.NODE_ENV === 'development' || req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
        return next();
    }

    const userAgent = req.headers['user-agent'];
    if (!userAgent || userAgent.includes('curl') || userAgent.includes('wget') || userAgent.includes('python')) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }

    const referer = req.headers.referer || req.headers.referrer;
    if (!referer || !referer.startsWith(ALLOWED_ORIGIN)) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }

    if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({
            error: 'Invalid content type'
        });
    }

    next();
}

app.use(express.json());
app.use(cors(corsOptions));

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const GOOGLE_CALENDAR_TIMEZONE = process.env.GOOGLE_CALENDAR_TIMEZONE || 'UTC';
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
const ALLOWED_ORIGIN = 'http://localhost:3000';
const APPOINTMENT_SLOT_TITLE = 'TRIAL SLOT';
const DEV = true; //DOIT ETRE FALSE DANS GOOGLE

app.get('/health', securityMiddleware, (req, res) => {
    res.send('Healthy');
});

app.get('/calendar/status', securityMiddleware, async (req, res) => {
    try {
        if (!GOOGLE_CALENDAR_ID) {
            return res.status(500).json({
                error: 'Google Calendar ID not configured'
            });
        }

        let auth;

        if (GOOGLE_SERVICE_ACCOUNT_KEY) {
            const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY);
            auth = new google.auth.GoogleAuth({
                credentials: credentials,
                scopes: ['https://www.googleapis.com/auth/calendar.readonly']
            });
        } else {
            auth = new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/calendar.readonly']
            });
        }

        const calendar = google.calendar({
            version: 'v3',
            auth
        });

        /**
         * COTE FRONT
         * prendre la date de demain jusqu'a la fin du mois
         * COTE BACK
         * renvoyer les evenements du min au max
         */
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const firstOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const endOfMonth = new Date(firstOfNextMonth.getTime() - 1);

        const dateMin = req.query.dateMin || tomorrow.toISOString();
        const dateMax = req.query.dateMax || endOfMonth.toISOString();

        console.log(dateMin);
        console.log(dateMax);

        const allEvents = await calendar.events.list({
            calendarId: GOOGLE_CALENDAR_ID,
            timeZone: GOOGLE_CALENDAR_TIMEZONE,
            q: "E*",
            timeMin: dateMin,
            timeMax: dateMax,
            singleEvents: true,
            orderBy: 'startTime'
        });


        const items = (allEvents.data.items || []).map((event) => {
            const startDate = new Date(event.start.dateTime || event.start.date);
            const endDate = new Date(event.end.dateTime || event.end.date);

            return {
                title: event.summary || "",
                description: event.description || "",
                date: startDate.toISOString().split("T")[0],
                startHour: startDate.toTimeString().split(":").slice(0, 2).join(":"),
                endHour: endDate.toTimeString().split(":").slice(0, 2).join(":"),
            };

        });

        const response = {
            success: true,
            calendar: {
                events: {
                    items: items
                }
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching calendar status:', error);
        res.status(500).json({
            error: 'Failed to fetch calendar status. Please check your configuration and try again.'
        });
    }
})



//NE PAS COPIER
app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening to 8080...');
});