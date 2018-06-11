using System;

namespace MushuRestaurant.Models.MyModels.MyTableModels
{
    public class MyRequestTable : MyBaseModel
    {
        #region Properties

        /// <summary>
        ///     Идентификатор зала
        /// </summary>
        public int HallId { get; set; }

        /// <summary>
        ///     Идентификатор стола
        /// </summary>
        public int? TableId { get; set; }

        /// <summary>
        ///     Дата начала заказа
        /// </summary>
        public DateTime? FromDate { get; set; }

        /// <summary>
        ///     Количество часов заказа
        /// </summary>
        public int CountHour { get; set; }

        /// <summary>
        ///     Имя клиента
        /// </summary>
        public string ClientName { get; set; }

        /// <summary>
        ///     Номер телефона
        /// </summary>
        public string ClientPhone { get; set; }

        #endregion
    }
}