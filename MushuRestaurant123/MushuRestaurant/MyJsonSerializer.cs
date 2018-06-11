using System;
using MushuRestaurant.Models;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Web.Script.Serialization;

namespace MushuRestaurant
{
    public static class MyJsonSerializer
    {
        /// <summary>
        /// Сериализовать объект в JSON
        /// </summary>
        /// <param name="myObject"></param>
        /// <returns></returns>
        public static string GetJSON(object myObject)
        {
            var stream = new MemoryStream();
            var jsonSerializer = new DataContractJsonSerializer(myObject.GetType());
            jsonSerializer.WriteObject(stream, myObject);
            stream.Position = 0;
            var sr = new StreamReader(stream);
            string result = sr.ReadToEnd();
            return result;
        }

        /// <summary>
        /// Получить объект из JSON
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="myJSON"></param>
        /// <returns></returns>
        public static T GetObject<T>(string myJSON)
        {
            var bufObject = new JavaScriptSerializer().Deserialize<T>(myJSON);
            if (bufObject == null)
                throw new AccessViolationException($"Объект JSON не соответствует объекту {typeof (T).Name}");
            return bufObject;
        }
    }
}