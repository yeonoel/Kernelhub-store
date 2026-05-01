import { Card, CardContent } from "../ui/card";

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    iconBgColor: string;
    iconLabel?: string;
}

export const StatCard = ({ title, value, icon, iconBgColor, iconLabel }: StatCardProps) => {
    return (
        <Card className="border-gray-200">
            <CardContent className="px-6 py-2">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        {iconLabel && (
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 block">
                                {iconLabel}
                            </span>
                        )}
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-lg ${iconBgColor} flex items-center justify-center`}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
