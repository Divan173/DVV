namespace MushuRestaurant.Models.MyModels.MyTableModels
{
    public class MyTable
    {
        #region Properties

        /// <summary>
        ///     Объект стола в БД
        /// </summary>
        public CatalogTable Table { get; set; }

        /// <summary>
        ///     Стол заказан
        /// </summary>
        public bool? IsClose { get; set; }

        #endregion
    }
}