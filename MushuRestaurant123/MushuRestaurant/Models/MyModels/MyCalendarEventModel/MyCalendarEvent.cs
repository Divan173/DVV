using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MushuRestaurant.Models.MyModels.MyCalendarEventModel
{
    public class MyCalendarEvent : MyBaseModel
    {
        /// <summary>
        /// Список событий
        /// </summary>
        public IEnumerable<EventItem> Events { get; set; }
    }

    public class EventItem
    {
        public int Id { set; get; }
        public string Link { set; get; }
        public string CurrentDate { set; get; }

        public EventItem()
        {
            this.Id = Int32.MinValue;
            this.Link = string.Empty;
            this.CurrentDate = string.Empty;
        }

        public EventItem(int id, string link, DateTime currentDate)
        {
            this.Id = id;
            this.Link = link;
            this.CurrentDate = currentDate.ToShortDateString();
        }
    }
}