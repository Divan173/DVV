using System.Collections.Generic;

namespace MushuRestaurant.Models.MyModels.MyHallModels
{
    public class MyHall : MyBaseModel
    {
        /// <summary>
        /// Список залов
        /// </summary>
        public IEnumerable<CatalogHall> Halls { get; set; }
    }
}