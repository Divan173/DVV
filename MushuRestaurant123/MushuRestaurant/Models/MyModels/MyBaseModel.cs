namespace MushuRestaurant.Models.MyModels
{
    public class MyBaseModel
    {
        #region Properties

        /// <summary>
        ///     Метод для поиска в карте
        /// </summary>
        public string Method { get; set; }

        /// <summary>
        ///     Статус ответа
        /// </summary>
        public int? Status { get; set; }

        /// <summary>
        ///     Ошика если что то пошло не так
        /// </summary>
        public string Error { get; set; }

        #endregion
    }
}