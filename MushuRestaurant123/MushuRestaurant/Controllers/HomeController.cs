using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web.Mvc;
using MushuRestaurant.Models;
using MushuRestaurant.Models.MyModels;
using MushuRestaurant.Models.MyModels.MyCalendarEventModel;
using MushuRestaurant.Models.MyModels.MyHallModels;
using MushuRestaurant.Models.MyModels.MyRequestCallModels;
using MushuRestaurant.Models.MyModels.MyTableModels;

namespace MushuRestaurant.Controllers
{
    public class HomeController : Controller
    {
        private readonly RestaurantDatabaseEntities m_Database = new RestaurantDatabaseEntities();

        #region Public Method (Generating comments)

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string json)
        {
            MyLog.Write("Index", json);

            MyBaseModel myBase;
            try
            {
                myBase = MyJsonSerializer.GetObject<MyBaseModel>(json);
            }
            catch (Exception ex)
            {
                MyLog.Write("Index (Exception)", json, ex.Message);

                myBase = new MyBaseModel();
                myBase.Error = ex.Message;
                myBase.Status = -1;
                return View(MyJsonSerializer.GetJSON(myBase));
            }

            string result;

            switch (myBase.Method)
            {
                case "GetHalls":
                    result = GetHalls();
                    break;
                case "GetTables":
                    result = GetTables(json);
                    break;
                case "Reservation":
                    result = Reservation(json);
                    break;
                case "RequestTable":
                    result = RequestTable(json);
                    break;
                case "GetEvents":
                    result = GetEvents();
                    break;
                default:
                    MyLog.Write("Index (Exception)", "", "Неизвестный метод");

                    myBase = new MyBaseModel();
                    myBase.Error = "Неизвестный метод";
                    myBase.Status = -1;
                    return View(MyJsonSerializer.GetJSON(myBase));
            }

            MyLog.Write("Index (Return)", result);

            return Json(result);
        }

        public ActionResult Menu()
        {
            return View();
        }

        #endregion

        #region Method

        /// <summary>
        ///     Получить список событий
        /// </summary>
        /// <returns></returns>
        private string GetEvents()
        {
            MyLog.Write("GetEvents", "");

            string result;
            IEnumerable<CalendarEvent> eventsList;

            try
            {
                var myCalendar = new MyCalendarEvent();
                myCalendar.Status = 0;
                eventsList = m_Database.CalendarEvents.Where(x => x.CurrentDate >= DateTime.Now).Take(10);
                

                if (!eventsList.Any())
                {
                    eventsList = m_Database.CalendarEvents.OrderByDescending(x => x.CurrentDate).ToList();

                    myCalendar.Events = eventsList.Select(ce =>
                        new EventItem()
                        {
                            Id = ce.Id,
                            Link = ce.Link,
                            CurrentDate = ce.CurrentDate.ToShortDateString()
                        }).ToList();
                }

                result = MyJsonSerializer.GetJSON(myCalendar);
            }
            catch (Exception ex)
            {
                MyLog.Write("GetEvents (Exception)", "", ex.Message);

                var myBase = new MyResponse();
                myBase.Error = ex.Message;
                myBase.Status = -1;

                result = MyJsonSerializer.GetJSON(myBase);
            }

            MyLog.Write("GetEvents (Return)", result);

            return result;
        }

        /// <summary>
        ///     Получить список залов
        /// </summary>
        /// <returns></returns>
        private string GetHalls()
        {
            MyLog.Write("GetHalls", "");

            string result;

            try
            {
                var myHall = new MyHall();
                myHall.Status = 0;
                myHall.Halls = m_Database.CatalogHalls;

                result = MyJsonSerializer.GetJSON(myHall);
            }
            catch (Exception ex)
            {
                MyLog.Write("GetHalls (Exception)", "", ex.Message);

                var myBase = new MyResponse();
                myBase.Error = ex.Message;
                myBase.Status = -1;

                result = MyJsonSerializer.GetJSON(myBase);
            }

            MyLog.Write("GetHalls (Return)", result);

            return result;
        }

        /// <summary>
        ///     Получить список столов
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        private string GetTables(string json)
        {
            MyLog.Write("GetTables", json);

            string result;

            try
            {
                var request = MyJsonSerializer.GetObject<MyRequestTable>(json);

                var myTables = new List<MyTable>();

                if (request.FromDate != null && request.CountHour > 0)
                {
                    DateTime toDate = request.FromDate.Value.AddHours(request.CountHour);
                    foreach (
                        GetCatalogTablesByClose_Result dataResult in
                            m_Database.GetCatalogTablesByClose(request.HallId, request.FromDate, toDate).ToArray())
                    {
                        var table = new CatalogTable();
                        table.Id = dataResult.Id;
                        table.HallId = dataResult.HallId;
                        table.Number = dataResult.Number;
                        table.VIP = dataResult.VIP;

                        var myTable = new MyTable();
                        myTable.Table = table;
                        myTable.IsClose = dataResult.IsClose;
                        myTables.Add(myTable);
                    }
                }
                else
                {
                    IQueryable<CatalogTable> tables = m_Database.CatalogTables.Where(x => x.HallId == request.HallId);
                    foreach (CatalogTable table in tables)
                    {
                        var myTable = new MyTable();
                        myTable.Table = table;
                        myTables.Add(myTable);
                    }
                }

                var response = new MyResponseTable();
                response.Status = 0;
                response.Tables = myTables;
                result = MyJsonSerializer.GetJSON(response);
            }
            catch (Exception ex)
            {
                MyLog.Write("GetTables (Exception)", "", ex.Message);

                var myBase = new MyResponse();
                myBase.Error = ex.Message;
                myBase.Status = -1;

                result = MyJsonSerializer.GetJSON(myBase);
            }

            MyLog.Write("GetTables (Return)", result);

            return result;
        }

        /// <summary>
        ///     Заказать столик
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        private string Reservation(string json)
        {
            MyLog.Write("Reservation", json);

            string result;

            try
            {
                var request = MyJsonSerializer.GetObject<MyRequestTable>(json);

                // Запускае проверку данных

                if (request.HallId == 0)
                {
                    throw new AccessViolationException("Зал не выбран!");
                }

                if (request.TableId == null)
                {
                    throw new AccessViolationException("Укажите стол");
                }

                if (string.IsNullOrWhiteSpace(request.ClientName))
                {
                    throw new AccessViolationException("Укажите Ваше имя");
                }

                if (string.IsNullOrWhiteSpace(request.ClientPhone))
                {
                    throw new AccessViolationException("Укажите Ваш номер телефона");
                }

                if (request.FromDate == null)
                {
                    throw new AccessViolationException("Укажите дату и время");
                }

                if (request.CountHour == 0)
                {
                    throw new AccessViolationException("Укажите количество часов");
                }

                // Проверка окончена сохраняем данные в базу

                var j = new Jn();
                j.Created = DateTime.Now;
                j.TableId = request.TableId.Value;
                j.ClientName = request.ClientName;
                j.ClientPhone = request.ClientPhone;
                j.FromDate = request.FromDate.Value;
                j.ToDate = request.FromDate.Value.AddHours(request.CountHour);

                // Сохраняем в базу

                m_Database.Jns.Add(j);
                m_Database.SaveChanges();

                var response = new MyResponse();
                response.Status = 0;
                result = MyJsonSerializer.GetJSON(response);
            }
            catch (Exception ex)
            {
                MyLog.Write("Reservation (Exception)", "", ex.Message);

                var myBase = new MyResponse();
                myBase.Error = ex.Message;
                myBase.Status = -1;

                result = MyJsonSerializer.GetJSON(myBase);
            }

            MyLog.Write("Reservation (Return)", result);

            return result;
        }

        /// <summary>
        ///     Заказать звонок
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        private string RequestTable(string json)
        {
            MyLog.Write("RequestTable", json);

            string result;

            try
            {
                var requestCall = MyJsonSerializer.GetObject<MyRequestCall>(json);

                // Запускае проверку данных

                if (string.IsNullOrWhiteSpace(requestCall.ClientName))
                {
                    throw new AccessViolationException("Введите Ваше имя");
                }

                if (string.IsNullOrWhiteSpace(requestCall.ClientPhone))
                {
                    throw new AccessViolationException("Укажите Ваш номер телефона");
                }

                // Проверка окончена сохраняем данные в базу

                var call = new RequestCall();
                call.Created = DateTime.Now;
                call.СlientName = requestCall.ClientName;
                call.ClientPhone = requestCall.ClientPhone;

                // Сохраняем в базу

                m_Database.RequestCalls.Add(call);
                m_Database.SaveChanges();

                var response = new MyResponse();
                response.Status = 0;
                result = MyJsonSerializer.GetJSON(response);
            }
            catch (Exception ex)
            {
                MyLog.Write("RequestTable (Exception)", "", ex.Message);

                var myBase = new MyResponse();
                myBase.Error = ex.Message;
                myBase.Status = -1;

                result = MyJsonSerializer.GetJSON(myBase);
            }

            MyLog.Write("RequestTable (Return)", result);

            return result;
        }

        #endregion
    }
}