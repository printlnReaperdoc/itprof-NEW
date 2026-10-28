# Database Backup and Restoration Guide

## 1. Automated Backups via mongodump
Perform a full binary snapshot of the LMS database:
```bash
# Set timestamp variable
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Execute compressed archive dump
mongodump --uri="mongodb+srv://<user>:<password>@cluster0.rzoaucu.mongodb.net/itprof-NEW" \
          --archive="backup_itprof_${TIMESTAMP}.gz" \
          --gzip
```

## 2. Automated Daily Cron Job
Add the following job to the system crontab (`crontab -e`):
```cron
# Run daily database backup at 2:00 AM UTC
0 2 * * * /usr/bin/mongodump --uri="$MONGO_URI" --archive="/backups/lms_$(date +\%F).gz" --gzip && find /backups/ -type f -name "*.gz" -mtime +30 -delete
```

## 3. Database Restoration via mongorestore
To restore from a compressed archive dump without dropping unaffected collections:
```bash
mongorestore --uri="mongodb+srv://<user>:<password>@cluster0.rzoaucu.mongodb.net/itprof-NEW" \
             --archive="backup_itprof_20261028.gz" \
             --gzip \
             --drop
```
*(Warning: `--drop` will drop each collection before restoring it from the archive).*

## 4. Disaster Recovery Point Objective (RPO)
- With MongoDB Atlas Continuous Cloud Backups, Point-in-Time Recovery (PITR) is enabled with a 1-minute granularity for the preceding 7 to 35 days.
- In self-hosted replica set topologies, Oplog tailing must be enabled to achieve RPO < 5 minutes.

