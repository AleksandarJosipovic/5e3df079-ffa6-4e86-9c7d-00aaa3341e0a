import { defineStore } from "pinia";
import { ref } from "vue";

interface Venue {
  direction: string;
  name: string;
}
interface Item {
  _id: string | number;
  title: string;
  flyerFront?: string;
  startTime?: string | Date | number;
  endTime?: string | Date | number;
  venue: Venue;
  createdAt: string | number | Date;
}

export type EventState = {
  itemsInStore: Item[];
};

export const useEventStore = defineStore("eventStore", () => {
  const eventsData = ref<any[]>([]);
  const eventsDataNoGroupe = ref<any[]>([]);
  const itemsInStore = localStorage.getItem("event_store")
    ? ref<[] | any>(JSON.parse(localStorage.getItem("event_store")))
    : ref<EventState>(<any>[]);

  // data fetching from API (GET methode)
  const getEventDataFromAPI = async () => {
    const API_URL =
      "https://teclead-ventures.github.io/data/london-events.json";

    const res: any = await fetch(API_URL); // retunr response
    const data: any = await res.json(); // get json data

    // return items with cover image
    eventsData.value = data.filter((items: any) => {
      if (!items.private) {
        return items.flyerFront != undefined;
      }
    });
    // sort items by date
    eventsData.value = sortDataByDate(eventsData.value);
    // sort items by date
    eventsDataNoGroupe.value = sortDataByDate(eventsData.value);
    // group Items by date
    eventsData.value = groupByDate(eventsData.value);
  };
  // store item (object) in value and local storage
  const storeNewItem = async (localStoreName: string, item: Item) => {
    if (!item) return;
    await itemsInStore.value.push(item); // push data in array
    useLocalStorage(localStoreName, itemsInStore.value); // store data in local store
    removeItemFromEventList(item._id); // remuve item from event list
  };
  // return gruped list by a date
  const groupByDate = (events: [] | any) => {
    return events.reduce((group: any, event: any) => {
      const { startTime } = event;
      let getStartDate = formatDate(new Date(startTime));
      group[getStartDate] = group[getStartDate] ?? [];
      group[getStartDate].push(event);
      return group;
    }, {});
  };
  // return sorted list by a date
  const sortDataByDate = (events: [] | any) => {
    return events.sort(function (a: any, b: any) {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
  };
  // return formatted date
  const formatDate = (date: string | Date | any) => {
    const weekday = date.toLocaleString("en-US", { weekday: "short" });
    const month = date.toLocaleString("en-US", { month: "short" });
    return [weekday, month, date.getDate(), date.getFullYear()].join(" ");
  };
  // store data in local storage
  const useLocalStorage = (localStoreName: string, payload: Item) => {
    localStorage.setItem(localStoreName, JSON.stringify(payload));
  };
  // return index
  const findIndexById = (id: string | number, getItems: [] | any) => {
    let getIndex: number = getItems.findIndex(
      (item: object | any) => item._id === id
    );
    return getIndex;
  };
  // search data by a title
  // return list grouped by a date
  const searchEvents = async (value: string | null) => {
    if (value) {
      eventsDataNoGroupe.value = eventsDataNoGroupe.value.filter(
        (items: any) => {
          return items.title?.toLowerCase().includes(value.toLowerCase());
        }
      );
      eventsData.value = groupByDate(eventsDataNoGroupe.value);
    } else {
      return getEventDataFromAPI();
    }
  };
  // remove item from a list
  const removeItemFromEventList = (id: string | number) => {
    for (const key in eventsData.value) {
      if (Object.prototype.hasOwnProperty.call(eventsData.value, key)) {
        const element: any = eventsData.value[key];
        const index = element.findIndex((row: object | any) => row._id === id);
        if (index !== -1) {
          eventsData.value[key].splice(index, 1);
        }
      }
    }
  };
  // remove item from local store
  const onRemoveItemFromStore = (id: string | number) => {
    const index = findIndexById(id, itemsInStore.value);
    if (index === -1) return;
    itemsInStore.value.splice(index, 1);
    useLocalStorage("event_store", itemsInStore.value);
  };
  // return all events, between two dates
  const filterListBetweenTwoDates = async (
    startTime: string | Date,
    endTime: string | Date
  ) => {
    await getEventDataFromAPI(); // reset event list
    // filter the list between two dates
    eventsDataNoGroupe.value = eventsDataNoGroupe.value.filter((item: any) => {
      return (
        new Date(item.startTime).getTime() >= new Date(startTime).getTime() &&
        new Date(item.startTime).getTime() <= new Date(endTime).getTime()
      );
    });
    eventsData.value = await groupByDate(eventsDataNoGroupe.value); // group the list
  };

  return {
    getEventDataFromAPI,
    eventsData,
    storeNewItem,
    findIndexById,
    itemsInStore,
    onRemoveItemFromStore,
    searchEvents,
    filterListBetweenTwoDates,
  };
});
