export type TSignalEventsMap = {
    'hello:world': { data: string };
};

export type PublisherEvents = keyof TSignalEventsMap;
//           ^?
