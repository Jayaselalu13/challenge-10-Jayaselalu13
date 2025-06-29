"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileModal = EditProfileModal;
exports.ChangePasswordModal = ChangePasswordModal;
exports.DeleteAccountModal = DeleteAccountModal;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const dialog_1 = require("@/components/ui/dialog");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/hooks/use-toast");
function EditProfileModal({ isOpen, onClose, user, onSave }) {
    const [name, setName] = (0, react_1.useState)(user.name);
    const [email, setEmail] = (0, react_1.useState)(user.email);
    const [bio, setBio] = (0, react_1.useState)(user.bio || "");
    const [avatar, setAvatar] = (0, react_1.useState)(user.avatar || "");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { toast } = (0, use_toast_1.useToast)();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(true);
        try {
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            onSave({ name, email, bio, avatar });
            toast({
                title: "Success",
                description: "Profile updated successfully!",
            });
            onClose();
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile.",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    });
    return (<dialog_1.Dialog open={isOpen} onOpenChange={onClose}>
      <dialog_1.DialogContent className="sm:max-w-[425px]">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Edit Profile</dialog_1.DialogTitle>
        </dialog_1.DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label_1.Label htmlFor="name">Name</label_1.Label>
            <input_1.Input id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div>
            <label_1.Label htmlFor="email">Email</label_1.Label>
            <input_1.Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div>
            <label_1.Label htmlFor="bio">Bio</label_1.Label>
            <textarea_1.Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself"/>
          </div>
          <div>
            <label_1.Label>Profile Picture</label_1.Label>
            <div className="mt-2">
              {avatar ? (<div className="flex items-center gap-4">
                  <img src={avatar || "/placeholder.svg"} alt="Avatar" className="w-16 h-16 rounded-full object-cover"/>
                  <button_1.Button type="button" variant="outline" onClick={() => setAvatar("")}>
                    Remove
                  </button_1.Button>
                </div>) : (<button_1.Button type="button" variant="outline" onClick={() => setAvatar("/image-6.png")} className="flex items-center gap-2">
                  <lucide_react_1.Upload className="w-4 h-4"/>
                  Upload Image
                </button_1.Button>)}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button_1.Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </button_1.Button>
            <button_1.Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button_1.Button>
          </div>
        </form>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
function ChangePasswordModal({ isOpen, onClose }) {
    const [currentPassword, setCurrentPassword] = (0, react_1.useState)("");
    const [newPassword, setNewPassword] = (0, react_1.useState)("");
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { toast } = (0, use_toast_1.useToast)();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "New passwords don't match.",
                variant: "destructive",
            });
            return;
        }
        setLoading(true);
        try {
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            toast({
                title: "Success",
                description: "Password changed successfully!",
            });
            onClose();
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to change password.",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    });
    return (<dialog_1.Dialog open={isOpen} onOpenChange={onClose}>
      <dialog_1.DialogContent className="sm:max-w-[425px]">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Change Password</dialog_1.DialogTitle>
        </dialog_1.DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label_1.Label htmlFor="current">Current Password</label_1.Label>
            <input_1.Input id="current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required/>
          </div>
          <div>
            <label_1.Label htmlFor="new">New Password</label_1.Label>
            <input_1.Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
          </div>
          <div>
            <label_1.Label htmlFor="confirm">Confirm New Password</label_1.Label>
            <input_1.Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
          </div>
          <div className="flex justify-end gap-2">
            <button_1.Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </button_1.Button>
            <button_1.Button type="submit" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button_1.Button>
          </div>
        </form>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
    const [confirmText, setConfirmText] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleConfirm = () => __awaiter(this, void 0, void 0, function* () {
        if (confirmText !== "DELETE")
            return;
        setLoading(true);
        try {
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            onConfirm();
        }
        finally {
            setLoading(false);
        }
    });
    return (<dialog_1.Dialog open={isOpen} onOpenChange={onClose}>
      <dialog_1.DialogContent className="sm:max-w-[425px]">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle className="text-red-600">Delete Account</dialog_1.DialogTitle>
        </dialog_1.DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            This action cannot be undone. This will permanently delete your account and remove all your data.
          </p>
          <div>
            <label_1.Label htmlFor="confirm">Type "DELETE" to confirm</label_1.Label>
            <input_1.Input id="confirm" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="DELETE"/>
          </div>
          <div className="flex justify-end gap-2">
            <button_1.Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </button_1.Button>
            <button_1.Button variant="destructive" disabled={confirmText !== "DELETE" || loading} onClick={handleConfirm}>
              {loading ? "Deleting..." : "Delete Account"}
            </button_1.Button>
          </div>
        </div>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
