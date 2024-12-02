using System.Reflection;

namespace CafeEmployee.Core.Utils;

public static class ObjectUtil
{
    public static void CopyProperties(object source, object destination)
    {
        if (source == null || destination == null)
        {
            throw new ArgumentNullException("Source or destination object is null.");
        }

        Type sourceType = source.GetType();
        Type destinationType = destination.GetType();
        PropertyInfo[] sourceProperties = sourceType.GetProperties(BindingFlags.Public | BindingFlags.Instance);
        PropertyInfo[] destinationProperties = destinationType.GetProperties(BindingFlags.Public | BindingFlags.Instance);
        
        foreach (PropertyInfo property in sourceProperties)
        {
            if (destinationProperties.All(x => x.Name != property.Name)) continue;
            
            if (property.CanRead && property.CanWrite)
            {
                object value = property.GetValue(source);
                property.SetValue(destination, value);
            }
        }
    }
}