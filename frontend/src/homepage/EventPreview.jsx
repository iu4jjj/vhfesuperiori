import { Button, Typography } from "@material-tailwind/react";
import { formatInTimeZone } from "date-fns-tz";
import { it } from "date-fns/locale";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const EventPreview = ({ event, ...props }) => {
  return (
    <div
      {...props}
      className="p-4 h-full min-h-[24rem] flex flex-col md:flex-row justify-center items-center"
    >
      {/* *          - name
       *          - description
       *          - date
       *          - joinDeadline
       *          - logoUrl
       *          - joinRequests */}

      <div className="w-full clamp flex flex-col justify-center mr-0 mb-4 md:mr-8 mb:mb-0">
        <LazyLoadImage
          className="max-h-[69vh] object-contain overflow-hidden"
          src={event.logoUrl}
          alt="Event logo"
        />
      </div>
      <div className="w-full flex flex-col items-start">
        <Typography variant="h1">{event.name}</Typography>

        <div className="text-gray-600 mt-2 mb-4">
          {formatInTimeZone(
            new Date(event.date),
            "Europe/Rome",
            "📅 dd/MM/yyyy  🕒 HH:mm",
            {
              locale: it
            }
          )}
        </div>

        {event.description && (
          <div
            className="line-clamp-5 mt-3"
            dangerouslySetInnerHTML={{
              __html: event.description
            }}
          />
        )}

        <div className="mt-5 md:ml-2 hover:animate-pulse focus:animate-ping">
          <Button>Visualizza</Button>
        </div>
        {/* <h3 className="font-medium tracking-tight text-xl uppercase">
        </h3> */}
      </div>
    </div>
  );
};

export default EventPreview;
